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
        res.json(err);
      });
  }
};
