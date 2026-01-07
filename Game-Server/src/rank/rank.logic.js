exports.getRank = (points) => {
  if (points >= 2000) return "Diamond";
  if (points >= 1200) return "Gold";
  if (points >= 600)  return "Silver";
  return "Bronze";
};

exports.calculatePoints = (isWin) => {
  return isWin ? 30 : -15;
};