const router = require("express").Router();
const User = require("../models/User");
const Payment = require("../models/Payment");
const CheatLog = require("../models/CheatLog");
const HWIDBan = require("../models/HWIDBan");
const IPBan = require("../models/IPBan");

// ✅ الاستدعاء الصح
const auth = require("../middlewares/auth.middleware");

/* ================== 👑 ADMIN CHECK ================== */
function onlyAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ msg: "Admins only" });
  }
  next();
}

/* ================== 👤 USERS ================== */
router.get("/users", auth, onlyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* ❌ DELETE USER */
router.delete("/users/:id", auth, onlyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ================== 💰 PAYMENTS ================== */
router.get("/payments", auth, onlyAdmin, async (req, res) => {
  const payments = await Payment.find().sort({ createdAt: -1 });
  res.json(payments);
});

/* ================== 🚨 CHEATS ================== */
router.get("/cheats", auth, onlyAdmin, async (req, res) => {
  const cheats = await CheatLog.find().sort({ createdAt: -1 });
  res.json(cheats);
});

/* ================== 🚫 HWID BAN ================== */
router.post("/ban-hwid", auth, onlyAdmin, async (req, res) => {
  const { hwid, reason } = req.body;
  if (!hwid) return res.status(400).json({ msg: "HWID required" });

  await HWIDBan.create({
    hwid,
    reason: reason || "No reason"
  });

  res.json({ success: true });
});

/* ================== 🚫 IP BAN ================== */
router.post("/ban-ip", auth, onlyAdmin, async (req, res) => {
  const { ip, reason } = req.body;
  if (!ip) return res.status(400).json({ msg: "IP required" });

  await IPBan.create({
    ip,
    reason: reason || "No reason"
  });

  res.json({ success: true });
});

module.exports = router;