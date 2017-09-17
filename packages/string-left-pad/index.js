module.exports = leftPad;

/*
  leftPad('hello', 9); // '    hello'
  leftPad('hello', 3); 'hello'
  leftPad('hello', 9, '.'); '....hello'
  leftPad(['hello'], 7, '_'); '__hello'
  leftPad(null, 7); '   null'
*/

function leftPad(str, length, char) {
  str = String(str);

  if (!length || length <= str.length) {
    return str;
  }

  var arr = [];
  if (char == null) {
    char = ' ';
  }

  var count = length;
  while (count--) {
    arr.push(char);
  }

  arr.push(str);
  return arr.join('').slice(-length);
}
