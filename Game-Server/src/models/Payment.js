const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  provider: String, // google | apple | vodafone
  productId: String,
  transactionId: String,
  amount: Number,
  coins: Number,
  status: String, // success | failed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);