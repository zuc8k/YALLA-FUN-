const mongoose = require("mongoose");

const IPBanSchema = new mongoose.Schema({
  ip: String,
  reason: String,
  bannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("IPBan", IPBanSchema);