const { Event } = require("../models");

module.exports = class EventController {
  static createEvent(req, res) {
    const { name, LocationId } = req.body;

    Event.create({ name, LocationId })
      .then((newEvent) => {
        res.status(201).send(newEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findEvents(req, res) {
    Event.findAll({
      include: ["Location"],
      attributes: { exclude: ["LocationId"] },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
