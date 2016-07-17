module.exports = unique;

/*
  unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]
  var a = {a: 3};
  var b = {b: 4};
  var c = {c: 5};
  unique([a, a, b, c, b]); // [a, b, c]
  unique([1, '1', 2, '2', 3, 2]); // [1, 2, 3]
  unique([1, '1', 2, '2', 3, 2], fuction(a, b) {return a === b}; // [1, '1', 2, '2', 3]
*/

function unique(arr, comparator) {
  var result = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var elem = arr[i];
    var duplicate = false;
    if (comparator) {
      for (var j = 0; j < result.length; j++) {
        if (comparator(elem, result[j])) {
          duplicate = true;
          break;
        }
      }
    } else {
      duplicate = result.indexOf(elem) > -1;
    }
    duplicate || result.push(elem);
  }
  return result;
}
