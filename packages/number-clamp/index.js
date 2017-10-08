module.exports = clamp;

/*
  var n = 5;
  clamp(1, n, 12); // 5
  clamp(1, n, 3); // 3
  clamp(8, n, 9); // 8
  clamp(0, n, 0); // 0
  
  var n = -5;
  clamp(1, n, 12); // 1
  clamp(-8, n, -7); // -7

  clamp(NaN, n, 8); // NaN
  clamp(3, n, NaN); // NaN  
  clamp(3, NaN, 8); // NaN    

  clamp(undefined, n, 8); // throws
  clamp(3, n, 'h'); // throws  
  clamp(3, false, 8); // throws   
*/

function clamp(lower, n, higher) {
  if (typeof lower != 'number' || typeof n != 'number' || typeof higher != 'number') {
    throw new Error('arguments must be numbers');
  }
  if (Number.isNaN(lower) || Number.isNaN(n) || Number.isNaN(higher)) {
    return NaN;
  }
  if (n < lower) {
    return lower;
  }
  if (n > higher) {
    return higher;
  }
  return n;
}
