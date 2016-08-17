module.exports = omit;

/*
  var obj = {a: 3, b: 5, c: 9};
  omit(obj, ['a', 'c']); // {b: 5}
  omit(obj, a, c); // {b: 5}
  omit(obj, ['a', 'b', 'd']); // {c: 9}
  omit(obj, ['a', 'a']); // {b: 5, c: 9}
*/

function omit(obj, remove) {
  if (typeof remove === 'string') {
    remove = [].slice.call(arguments, 1);
  }
  var len = remove.length;
  for (var i = 0; i < len; i++) {
    if (obj.hasOwnProperty(remove[i])) {
      delete obj[remove[i]];
    }
  }
  return obj;
}
