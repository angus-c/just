module.exports = modulo;

/*
  modulo(7, 5); // 2
  modulo(17, 23); // 17
  modulo(16.2, 3.8); // 1
  modulo(5.8, 3.4); //2.4
  modulo(4, 0); // 4
  modulo(-7, 5); // 3
  modulo(-2, 15); // 13
  modulo(-5.8, 3.4); // 1
  modulo(12, -1); // NaN
  modulo(-3, -8); // NaN
  modulo(12, 'apple'); // NaN
  modulo('bee', 9); // NaN
  modulo(null, undefined); // NaN
*/

function modulo(n, d) {
  if (d === 0) {
    return n;
  }
  if (d < 0) {
    return NaN;
  }
  return (n % d + d) % d;
}
