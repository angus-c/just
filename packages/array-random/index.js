module.exports = random;

/*
  random([1, 2, 3]); // one of [1, 2, 3], at random
  random([1]); // 1
  random(); // throws
*/

function random(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
