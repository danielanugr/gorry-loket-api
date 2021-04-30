const router = require("express").Router();
const EventController = require("../controllers/eventController");

router.post("/create", EventController.createEvent);

module.exports = router;
