module.exports = leftPad;

/*
  leftPad('hello', 9); // '    hello'
  leftPad('hello', 3); // 'hello'
  leftPad('hello', 9, '.'); // '....hello'
  leftPad('hello', 9, '..'); // '....hello'
  leftPad('hello', 10, 'ab'); // 'bababhello'
  leftPad('hello', 9, '\uD83D\uDC04'); // '🐄🐄🐄🐄hello'
  leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // '🐄🐑🐄🐑🐄hello'
  leftPad('hello', 7, '🐄'), // '🐄🐄hello'
  leftPad(null, 7); // throws
  leftPad([], 4, '*'); // throws
  leftPad('hello', 4, true); // throws
*/

var surrogatePairRegEx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function leftPad(str, length, padStr) {
  if (typeof str != 'string' || (arguments.length > 2 && typeof padStr != 'string')) {
    throw Error('first and padding arguments must be strings');
  }
  if (padStr == null || padStr == '') {
    padStr = ' ';
  }
  var strLen = str.length - (str.match(surrogatePairRegEx) || []).length;
  var padStrLen = padStr.length;
  var surrPairsInPad = (padStr.match(surrogatePairRegEx) || []).length;
  if (surrPairsInPad && padStrLen / surrPairsInPad != 2) {
    throw Error('padding mixes regular characters and surrogate pairs');
  }

  if (!length || length <= strLen) {
    return str;
  }
  var padCount = Math.floor((length - strLen) / padStrLen);
  var padRemainder = (length - strLen) % padStrLen;
  if (surrPairsInPad) {
    padCount = 2 * padCount;
    padRemainder = 2 * padRemainder;
  }
  var result = [];
  if (padRemainder) {
    result.unshift(padStr.slice(-padRemainder));
  }

  console.log(padCount, padRemainder, result);
  while (padCount-- >= 1) {
    result.push(padStr);
  }
  if ((length - strLen) / padStrLen) {
  }
  return result.concat(str).join('');
}
