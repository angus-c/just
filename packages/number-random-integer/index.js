module.exports = random;

function random(min, max) {
  if (typeof min !== "number" || typeof max !== "number")
    throw new Error("random: min and max must be numbers");
  return ~~(Math.random() * (++max - min)) + min;
}
