const RANKS = require("./ranks.config");

function getRankData(points) {
  let current = RANKS[0];

  for (const rank of RANKS) {
    if (points >= rank.min) {
      current = rank;
    }
  }
  return current;
}

function applyRank(user) {
  const rankData = getRankData(user.rankPoints || 0);

  if (user.rank !== rankData.name) {
    user.rank = rankData.name;
    user.rankBadge = rankData.badge; // 👈 جديد
    return true;
  }

  user.rankBadge = rankData.badge;
  return false;
}

module.exports = {
  getRankData,
  applyRank
};