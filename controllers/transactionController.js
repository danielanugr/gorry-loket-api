const {
  Transaction,
  TransactionTicket,
  Ticket,
  Event,
  sequelize,
} = require("../models");

module.exports = class TransactionController {
  static async purchaseTicket(req, res) {
    let trans = await sequelize.transaction();
    try {
      let { customerName, email, EventId, tickets } = req.body;
      let ticketIds = tickets.map((ticket) => ticket.TicketId); //map all the ticketId
      //Check the ticket either they're ticket for the same event or not
      const findTicket = await Ticket.findAll({
        where: { id: ticketIds, EventId },
      });
      if (findTicket.length !== tickets.length) {
        //If the ticket doesn't match, throw and error
        throw {
          name: "customError",
          message: "Transaction contain more than 1 event",
        };
      }

      //if the ticket match, create Transaction
      const newTransaction = await Transaction.create({
        customerName,
        email,
        EventId,
      });

      //because we want to bulkCreate, and bulk Create doesn't add the required fields automatically, we add it manually.
      tickets.forEach((ticket) => {
        ticket.TransactionId = newTransaction.id;
        ticket.createdAt = new Date();
        ticket.updatedAt = new Date();
      });

      //Create the transaction detail
      const transTickets = await TransactionTicket.bulkCreate(tickets);

      // loop the transaction detail
      for (const transaction of transTickets) {
        // find the ticket data
        const ticket = await Ticket.findByPk(transaction.TicketId);
        if (ticket.quota < transaction.amount) {
          //check either the ticket quota is enough or not
          throw { name: "customError", message: "ticket quota exceeded" }; //if the amount is bigger than the ticket quota, throw error
        } else {
          let newQuota = ticket.quota - transaction.amount;
          await ticket.update({ quota: newQuota }); //update the ticket quota
        }
      }

      await trans.commit();
      res.status(201).json({ transactionId: newTransaction.id }); //send the transactionId as response
    } catch (err) {
      await trans.rollback(); //if there's error, rollback all the query.
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error.message);
        });
        res.status(400).json({ message: errors.join(", ") });
      } else if (err.name === "customError") {
        res.status(400).json({ message: err.message }); //error from custom error is processed here
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getTransaction(req, res) {
    try {
      const { transaction_id } = req.query;

      //find the transaction
      const transactions = await Transaction.findByPk(transaction_id, {
        include: [{ model: TransactionTicket, include: [Ticket] }],
      });

      res.status(200).json(transactions); //send the transaction data as response
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
