module.exports = flatten;

/*
  flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  var result = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var elem = arr[i];
    if (Array.isArray(elem)) {
      result.push.apply(result, flatten(elem));
    } else {
      result.push(elem);
    }
  }
  return result;
}
