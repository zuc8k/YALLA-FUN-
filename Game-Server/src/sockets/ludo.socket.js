module.exports = (io, socket) => {

  socket.on("join_ludo_room", ({ roomId }) => {
    if (!roomId) return;

    socket.join(roomId);

    const room = io.sockets.adapter.rooms.get(roomId);
    const playersCount = room ? room.size : 0;

    console.log("🎮 Player joined:", roomId, "Count:", playersCount);

    // لو فيه لاعبين كفاية نبدأ
    if (playersCount >= 2) {
      io.to(roomId).emit("ludo_start", {
        roomId,
        playersCount
      });
    }
  });

};