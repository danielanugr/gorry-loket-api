const router = require("express").Router();
const EventController = require("../controllers/eventController");
const TicketController = require("../controllers/ticketController");

router.post("/create", EventController.createEvent);
router.get("/get_info", EventController.findEvents);
router.post("/ticket/create", TicketController.createTicket);

module.exports = router;
