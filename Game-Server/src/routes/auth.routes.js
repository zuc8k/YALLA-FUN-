const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const hwidCheck = require("../middlewares/hwid.middleware");
const { authLimiter } = require("../middlewares/rateLimit.middleware");
const ipBan = require("../middlewares/ipban.middleware");

router.post(
  "/register",
  ipBan,
  authLimiter,
  hwidCheck,
  auth.register
);

router.post(
  "/login",
  ipBan,
  authLimiter,
  hwidCheck,
  auth.login
);

module.exports = router;