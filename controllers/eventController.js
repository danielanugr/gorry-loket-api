const { Event } = require("../models");
const { Schedule } = require("../models");

module.exports = class EventController {
  static createEvent(req, res) {
    const { name, LocationId, startDate, endDate } = req.body;
    let scheduleId = "";
    const start = new Date(startDate);
    const end = new Date(endDate);

    Schedule.create({ startDate: start, endDate: end })
      .then((newSchedule) => {
        scheduleId = newSchedule.id;
        console.log(scheduleId);
        return Event.create({ name, LocationId, ScheduleId: scheduleId });
      })
      .then((newEvent) => {
        res.status(201).json(newEvent);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).json({ message: err.errors[0].message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static findEvents(req, res) {
    Event.findAll({
      include: ["Location", "Schedule", "Tickets"],
      attributes: { exclude: ["LocationId", "ScheduleId"] },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
