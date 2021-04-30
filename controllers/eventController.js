const { Event } = require("../models");

module.exports = class EventController {
  static createEvent(req, res) {
    const { name } = req.body;

    Event.create({ name })
      .then((newEvent) => {
        res.status(201).send(newEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
