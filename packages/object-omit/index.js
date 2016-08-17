module.exports = omit;

/*
  var obj = {a: 3, b: 5, c: 9};
  omit(obj, ['a', 'c']); // {b: 5}
  omit(obj, a, c); // {b: 5}
  omit(obj, ['a', 'b', 'd']); // {c: 9}
  omit(obj, ['a', 'a']); // {b: 5, c: 9}
*/

function omit(obj, remove) {
  var result = {};
  if (typeof remove === 'string') {
    remove = [].slice.call(arguments, 1);
  }
  for (var attr in obj) {
    if (remove.indexOf(attr) === -1) {
      result[attr] = obj[attr];
    }
  }
  return result;
}
