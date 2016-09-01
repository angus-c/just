module.exports = random;

/*
  random([1, 2, 3]); // one of [1, 2, 3], at random
  random([1]); // 1
  random(); // undefined
*/

function random(arr) {
  return arr != null ? arr[Math.floor(Math.random() * arr.length)] : undefined;
}
