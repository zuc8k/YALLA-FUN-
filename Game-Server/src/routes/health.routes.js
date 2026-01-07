const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    time: new Date()
  });
});

module.exports = router;