const router = require("express").Router();
const eventRouter = require("./eventRoute");
const locationRouter = require("./locationRoute");
const transactionRouter = require("./transactionRoute");

router.use("/event", eventRouter);
router.use("/location", locationRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
