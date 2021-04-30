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
        throw { message: "Transaction contain more than 1 event" };
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

      await TransactionTicket.bulkCreate(tickets);

      await trans.commit();
      res.status(201).json({ message: "transaction success" });
    } catch (err) {
      console.log(err, "dari catch");
      await trans.rollback();
      res.json(err);
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
      res.json(err);
    }
  }
};
