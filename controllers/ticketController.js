const { Ticket, Event } = require("../models");

module.exports = class TicketController {
  static createTicket(req, res) {
    const { event_id } = req.query;
    const { name, quota, price } = req.body;

    Event.findByPk(event_id)
      .then((event) => {
        if (event) {
          return Ticket.create({
            EventId: event.id,
            quota: +quota,
            price: +price,
            name,
          });
        } else {
          res.status(404).json({ message: "Event does not exist" });
        }
      })
      .then((newTicket) => {
        res.status(201).json(newTicket);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          let errors = [];
          err.errors.forEach((error) => {
            errors.push(error.message);
          });
          res.status(400).json({ message: errors.join(",") });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }
};
