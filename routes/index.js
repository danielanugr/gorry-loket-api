const router = require("express").Router();
const eventRouter = require("./eventRoute");
const locationRouter = require("./locationRoute");

router.use("/event", eventRouter);
router.use("/location", locationRouter);

module.exports = router;
