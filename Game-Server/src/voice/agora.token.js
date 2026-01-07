const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const APP_ID = "AGORA_APP_ID";
const APP_CERT = "AGORA_APP_CERT";

exports.generateToken = (req, res) => {
  const { channel, uid } = req.body;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERT,
    channel,
    uid,
    RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + 3600
  );

  res.json({ token, appId: APP_ID });
};