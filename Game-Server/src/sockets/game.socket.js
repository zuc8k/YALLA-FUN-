const redis = require("../config/redis");

const rooms = {}; // memory rooms (MVP)

module.exports = (io, socket) => {

  /* ================== CREATE ROOM ================== */
  socket.on("create_room", async () => {
    const roomId = "ROOM_" + Math.floor(Math.random() * 9999);

    rooms[roomId] = {
      players: [socket.id],
      turn: 0
    };

    socket.join(roomId);

    // 🟢 زود عدّاد الرومات
    try {
      await redis.incr("rooms:count");
    } catch (e) {}

    socket.emit("room_created", roomId);
  });

  /* ================== JOIN ROOM ================== */
  socket.on("join_room", (roomId) => {
    if (!rooms[roomId]) return;

    rooms[roomId].players.push(socket.id);
    socket.join(roomId);

    io.to(roomId).emit("player_joined", rooms[roomId].players);
  });

  /* ================== ROLL DICE ================== */
  socket.on("roll_dice", (roomId) => {
    const room = rooms[roomId];
    if (!room) return;

    const currentPlayer = room.players[room.turn];
    if (socket.id !== currentPlayer) return;

    const dice = Math.floor(Math.random() * 6) + 1;

    io.to(roomId).emit("dice_result", {
      player: socket.id,
      value: dice
    });

    room.turn = (room.turn + 1) % room.players.length;
    io.to(roomId).emit("next_turn", room.turn);
  });

  /* ================== DISCONNECT ================== */
  socket.on("disconnect", async () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const index = room.players.indexOf(socket.id);

      if (index !== -1) {
        room.players.splice(index, 1);

        // لو الروم فضيت → احذفها
        if (room.players.length === 0) {
          delete rooms[roomId];

          // 🔴 نقص عدّاد الرومات
          try {
            await redis.decr("rooms:count");
          } catch (e) {}
        }
      }
    }
  });

};