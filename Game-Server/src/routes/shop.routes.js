const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const shop = require("../controllers/shop.controller");

router.get("/gifts", auth, shop.getGifts);
router.post("/send-gift", auth, shop.sendGift);

module.exports = router;