const { Ticket, Event } = require("../models");

module.exports = class TicketController {
  static createTicket(req, res) {
    const { event_id } = req.query;
    const { name, quota, price } = req.body;

    //Find either the event exist or not
    Event.findByPk(event_id)
      .then((event) => {
        if (event) {
          //If the event exist, create the ticket
          return Ticket.create({
            EventId: event.id,
            quota: +quota,
            price: +price,
            name,
          });
        } else {
          res.status(404).json({ message: "Event does not exist" }); //If the event doesn't exist, send error message with status code 404
        }
      })
      .then((newTicket) => {
        res.status(201).json(newTicket); //send the new Ticket data as response
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          let errors = [];
          err.errors.forEach((error) => {
            errors.push(error.message);
          });
          res.status(400).json({ message: errors.join(", ") });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }
};
