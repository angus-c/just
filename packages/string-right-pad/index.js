module.exports = rightPad;

/*
  rightPad('hello', 9); // 'hello    '
  rightPad('hello', 3); 'hello'
  rightPad('hello', 9, '.'); 'hello....'
  rightPad(['hello'], 7, '_'); 'hello__'
  rightPad(null, 7); 'null   '
*/

function rightPad(str, length, char) {
  str = String(str);

  if (!length || length <= str.length) {
    return str;
  }

  var arr = [];
  if (char == null) {
    char = ' ';
  }

  arr.push(str);

  var count = length;
  while(count--) {
    arr.push(char);
  }

  return arr.join('').slice(0, length);
}
