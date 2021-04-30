const { Location } = require("../models");

module.exports = class LocationController {
  static createLocation(req, res) {
    const { locationName } = req.body;

    //Creaste new Location
    Location.create({ locationName })
      .then((newLocation) => {
        res.status(201).json(newLocation); //send the new Location data as response
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
