const router = require("express").Router();
const eventRouter = require("./eventRoute");

router.use("/event", eventRouter);

module.exports = router;
