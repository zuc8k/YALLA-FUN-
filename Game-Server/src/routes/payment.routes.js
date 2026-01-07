const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const payment = require("../controllers/payment.controller");

router.post("/verify", auth, payment.verifyPayment);

module.exports = router;