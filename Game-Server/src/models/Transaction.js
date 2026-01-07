const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String, // win | gift | purchase
  amount: Number,
  balanceAfter: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);