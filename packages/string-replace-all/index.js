module.exports = replaceAll;

/*
  replaceAll('hello, world', 'l', 'q'); // 'heqqo, worqd'
  replaceAll('hello, world', 'l', 'qq'); // 'heqqqqo, worqqd'
  replaceAll('hello, world', 'll', 'q'); // 'heqo, world'
  replaceAll('hello, world', '', 'q'); // 'hello, world'
  replaceAll('hello, world', null, 'q'); // 'hello, world'
  replaceAll(null, 'l, 'q'); // null
  replaceAll('hello, world', 'l', ''); // 'heo, word'
  replaceAll('hello, world', 'l', null); // 'hello, world'
*/

function replaceAll(str, subStr, newSubStr) {
  if (!str || !subStr || !newSubStr && newSubStr != '') {
    return str;
  }
  return str.split(subStr).join(newSubStr);
}
