module.exports = union;

/*
  union([1, 2, 5, 6], [2, 3, 4, 6]); // [1, 2, 5, 6, 3, 4]
*/

function union(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }
  var result = arr1.concat([]);
  var len = arr2.length;
  for (var i = 0; i < len; i++) {
    var elem = arr2[i];
    if (arr1.indexOf(elem) == -1) {
      result.push(elem);
    }
  }
  return result;
}
