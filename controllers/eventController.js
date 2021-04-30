const { Event, Schedule } = require("../models");

module.exports = class EventController {
  static createEvent(req, res) {
    const { name, LocationId, startDate, endDate } = req.body;
    let scheduleId = "";
    const start = new Date(startDate);
    const end = new Date(endDate);

    Schedule.create({ startDate: start, endDate: end })
      .then((newSchedule) => {
        scheduleId = newSchedule.id;
        return Event.create({ name, LocationId, ScheduleId: scheduleId });
      })
      .then((newEvent) => {
        res.status(201).json(newEvent);
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

  static findEvents(req, res) {
    Event.findAll({
      where: req.query.event_id ? { id: req.query.event_id } : "",
      include: ["Location", "Schedule", "Tickets"],
      attributes: { exclude: ["LocationId", "ScheduleId"] },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
};
