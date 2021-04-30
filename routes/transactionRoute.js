const router = require("express").Router();
const TransactionController = require("../controllers/transactionController");

router.post("/purchase", TransactionController.purchaseTicket);
router.get("/get_info", TransactionController.getTransaction);

module.exports = router;
