const tg = require("./telegram");

setInterval(() => {
  const mem = process.memoryUsage().rss / 1024 / 1024;

  if (mem > 500) {
    tg.sendAlert(`🔥 High Memory Usage: ${mem.toFixed(2)} MB`);
  }
}, 60000);