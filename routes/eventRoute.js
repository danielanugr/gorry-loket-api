const router = require("express").Router();
const EventController = require("../controllers/eventController");

router.post("/create", EventController.createEvent);
router.get("/get_info", EventController.findEvents);

module.exports = router;
