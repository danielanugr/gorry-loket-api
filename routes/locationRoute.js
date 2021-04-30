const router = require("express").Router();
const LocationController = require("../controllers/locationController");

router.post("/create", LocationController.createLocation);

module.exports = router;
