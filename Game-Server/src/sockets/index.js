const matchmaking = require("../matchmaking/matchmaking");
const ludoSocket = require("../ludo/ludo.socket");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.on("connection", (socket) => {

    const token = socket.handshake.auth?.token;
    if (!token) return socket.disconnect();

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return socket.disconnect();
    }

    socket.on("find_match", ({ players }) => {
      matchmaking.joinQueue(io, socket, user, players);
    });

    socket.on("cancel_match", () => {
      matchmaking.leaveQueue(socket);
    });

    ludoSocket(io, socket);

    socket.on("disconnect", () => {
      matchmaking.leaveQueue(socket);
    });
  });
};