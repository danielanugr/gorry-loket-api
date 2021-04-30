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
      let ticketIds = tickets.map((ticket) => ticket.TicketId);
      const findTicket = await Ticket.findAll({
        where: { id: ticketIds, EventId },
      });
      if (findTicket.length !== tickets.length) {
        throw {
          name: "customError",
          message: "Transaction contain more than 1 event",
        };
      }

      const newTransaction = await Transaction.create({
        customerName,
        email,
        EventId,
      });

      tickets.forEach((ticket) => {
        ticket.TransactionId = newTransaction.id;
        ticket.createdAt = new Date();
        ticket.updatedAt = new Date();
      });

      const transTickets = await TransactionTicket.bulkCreate(tickets);

      for (const transaction of transTickets) {
        const ticket = await Ticket.findByPk(transaction.TicketId);
        if (ticket.quota < transaction.amount) {
          throw { name: "customError", message: "ticket quota exceeded" };
        } else {
          let newQuota = ticket.quota - transaction.amount;
          await ticket.update({ quota: newQuota });
        }
      }

      await trans.commit();
      res.status(201).json({ transactionId: newTransaction.id });
    } catch (err) {
      await trans.rollback();
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error.message);
        });
        res.status(400).json({ message: errors.join(", ") });
      } else if (err.name === "customError") {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getTransaction(req, res) {
    try {
      const { transaction_id } = req.query;

      const transactions = await Transaction.findByPk(transaction_id, {
        include: [{ model: TransactionTicket, include: [Ticket] }],
      });

      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
