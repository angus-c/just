module.exports = choice;

/*
  choice([1, 2, 3]); // one of [1, 2, 3], at random
  choice([1]); // 1
  choice(); // undefined
*/

function choice(arr) {
  return arr != null ? arr[Math.floor(Math.random() * arr.length)] : undefined;
}
