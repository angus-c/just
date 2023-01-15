module.exports = replaceAll;

/*
  replaceAll('hello, world', 'l', 'q'); // 'heqqo, worqd'
  replaceAll('hello, world', 'l', 'qq'); // 'heqqqqo, worqqd'
  replaceAll('hello, world', 'll', 'q'); // 'heqo, world'
  replaceAll('hello, world', '', 'q'); // 'hello, world'
  replaceAll('hello, world', 'l', ''); // 'heo, word'
  replaceAll('hello, world', null, 'q'); // 'hello, world'
  replaceAll('hello, world', 'l'); // throw
  replaceAll('hello, world'); // throw
  replaceAll(); // throw
  replaceAll(null, 'l', 'q'); // throw
  replaceAll('hello, world', null, 'q'); // throw
  replaceAll('hello, world', 'l', null); // throw
*/

function replaceAll(str, subStr, newSubStr) {
  if (
    arguments.length !== 3 ||
    typeof str != 'string' ||
    typeof subStr != 'string' ||
    typeof newSubStr != 'string'
  ) {
    throw new Error('just-replace-all expects three string arguments');
  }
  if (!subStr) {
    return str;
  }
  return str.split(subStr).join(newSubStr);
}
