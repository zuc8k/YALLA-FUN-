const axios = require("axios");

const BOT_TOKEN = process.env.TG_BOT;
const CHAT_ID = process.env.TG_CHAT;

exports.sendAlert = async (msg) => {
  await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      chat_id: CHAT_ID,
      text: msg
    }
  );
};