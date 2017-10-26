module.exports = leftPad;

/*
  leftPad('hello', 9); // '    hello'
  leftPad('hello', 3); 'hello'
  leftPad('hello', 9, '.'); '....hello'
  leftPad(['hello'], 7, '_'); '__hello'
  leftPad(null, 7); '   null'
*/

var surrogatePairRegEx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function leftPad(str, length, padStr) {
  str = String(str);
  if (padStr == null) {
    padStr = ' ';
  }

  var strLen = str.length - (str.match(surrogatePairRegEx) || []).length;
  var padStrLen = padStr.length - (padStr.match(surrogatePairRegEx) || []).length;

  if (!length || length <= strLen) {
    return str;
  }

  var padCount = (length - strLen) / padStrLen;

  var result = [];

  while (padCount--) {
    result.push(padStr);
  }
  return result.concat(str).join('');
}
