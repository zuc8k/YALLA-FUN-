const redis = require("../config/redis");

exports.createRoom = async (roomId, data) => {
  await redis.set(
    `room:${roomId}`,
    JSON.stringify(data)
  );
};

exports.getRoom = async (roomId) => {
  const data = await redis.get(`room:${roomId}`);
  return JSON.parse(data);
};

exports.updateRoom = async (roomId, data) => {
  await redis.set(
    `room:${roomId}`,
    JSON.stringify(data)
  );
};

exports.deleteRoom = async (roomId) => {
  await redis.del(`room:${roomId}`);
};