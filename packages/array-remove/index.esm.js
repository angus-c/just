var arrayRemove = remove;

/*
  remove([1, 2, 3, 4, 5, 6], [1, 3, 6]); // [2, 4, 5]
*/

function remove(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }
  var result = [];
  var len = arr1.length;
  for (var i = 0; i < len; i++) {
    var elem = arr1[i];
    if (arr2.indexOf(elem) == -1) {
      result.push(elem);
    }
  }
  return result;
}

export {arrayRemove as default};
