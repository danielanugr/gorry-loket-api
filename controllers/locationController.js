const { Location } = require("../models");

module.exports = class LocationController {
  static createLocation(req, res) {
    const { locationName } = req.body;

    Location.create({ locationName })
      .then((newLocation) => {
        res.status(201).send(newLocation);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
