const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    /* ================== 🔑 ACCOUNT ================== */
    uid: {
      type: String,
      required: true,
      unique: true
    },

    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true // hashed
    },

    /* ================== 📞 REGISTER INFO ================== */
    phone: {
      type: String,
      default: null
    },

    email: {
      type: String,
      default: null
    },

    favorite: {
      type: String,
      default: null
    },

    /* ================== 👑 ROLE ================== */
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    /* ================== 🖥 HARDWARE ================== */
    hwid: {
      type: String,
      default: null
    },

    /* ================== 🚫 MODERATION ================== */
    banned: {
      type: Boolean,
      default: false
    },

    /* ================== 💰 ECONOMY ================== */
    coins: {
      type: Number,
      default: 1000
    },

    gems: {
      type: Number,
      default: 10
    },

    /* ================== 🎮 PROGRESS ================== */
    level: {
      type: Number,
      default: 1
    },

    xp: {
      type: Number,
      default: 0
    },

    wins: {
      type: Number,
      default: 0
    },

    loses: {
      type: Number,
      default: 0
    },

    /* ================== 🏆 RANK ================== */
    rankBadge: {
      type: String,
      default: "🥉"
    },

    rank: {
      type: String,
      default: "Bronze"
    },

    /* ================== 🕒 META ================== */
    lastLogin: {
      type: Date,
      default: null
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("User", UserSchema);