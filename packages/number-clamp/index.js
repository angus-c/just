module.exports = clamp;

/*
  var n = 5;
  clamp(1, n, 12); // 5
  clamp(12, n, 3); // 5
  clamp(8.2, n, 9,4); // 8.2
  clamp(0, n, 0); // 0

  var n = -2;
  clamp(1, n, 12); // 1
  clamp(-4, n, -7); // -4

  clamp(NaN, n, 8); // NaN
  clamp(3, n, NaN); // NaN
  clamp(3, NaN, 8); // NaN

  clamp(undefined, n, 8); // throws
  clamp(3, n, 'h'); // throws
  clamp(12, false, 8); // throws
*/

function clamp(b1, n, b2) {
  if (typeof b1 != 'number' || typeof n != 'number' || typeof b2 != 'number') {
    throw new Error('arguments must be numbers');
  }
  if (isNaN(b1) || isNaN(n) || isNaN(b2)) {
    return NaN;
  }
  if (b1 == b2) {
    return b1;
  }
  var lower, higher;
  b1 < b2 ? ((lower = b1), (higher = b2)) : ((higher = b1), (lower = b2));
  if (n < lower) {
    return lower;
  }
  if (n > higher) {
    return higher;
  }
  return n;
}
