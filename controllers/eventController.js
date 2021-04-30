const { Event, Schedule } = require("../models");

module.exports = class EventController {
  static createEvent(req, res) {
    const { name, LocationId, startDate, endDate } = req.body;
    let scheduleId = "";
    const start = new Date(startDate);
    const end = new Date(endDate);

    //Create the Schedule for the Event
    Schedule.create({ startDate: start, endDate: end })
      .then((newSchedule) => {
        scheduleId = newSchedule.id;
        return Event.create({ name, LocationId, ScheduleId: scheduleId }); // Create the Event
      })
      .then((newEvent) => {
        res.status(201).json(newEvent); // Send the Event that just created as response
      })
      .catch((err) => {
        //check where the error come from
        if (err.name === "SequelizeValidationError") {
          //if the error come from Validation, run this code
          let errors = [];
          err.errors.forEach((error) => {
            errors.push(error.message); //list all the error
          });
          res.status(400).json({ message: errors.join(", ") }); //show the error in string format
        } else {
          res.status(500).json({ message: "Internal Server Error" }); //if the error come from the server, send this error response
        }
      });
  }

  static findEvents(req, res) {
    Event.findAll({
      where: req.query.event_id ? { id: req.query.event_id } : "", //If the user include query params, it will filter the data, if not it will show all data
      include: ["Location", "Schedule", "Tickets"], //join data from table Locations, Schedules, and Tickets
      attributes: { exclude: ["LocationId", "ScheduleId"] }, //Don't show the LocationId and ScheduleId
    })
      .then((data) => {
        res.status(200).json(data); //Send the data as response
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
};
