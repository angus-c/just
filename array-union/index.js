module.exports = union;

/*
  union([1, 2, 5, 6], [2, 3, 4, 6]); // [1, 2, 3, 4, 5, 6]
*/

function union(arr1, arr2) {
  var result = arr1;
  var len = arr2.length;
  for (var i = 0; i < len; i++) {
    var elem = arr2[i];
    if (arr1.indexOf(elem) == -1) {
      result.push(elem);
    }
  }
  return result;
}
