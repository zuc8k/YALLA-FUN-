const router = require("express").Router();
const voice = require("../voice/agora.token");

router.post("/token", voice.generateToken);

module.exports = router;