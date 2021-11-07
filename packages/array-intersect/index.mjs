var arrayIntersect = intersect;

/*
  intersect([1, 2, 5, 6], [2, 3, 5, 6]); // [2, 5, 6]
  intersect([1, 2, 2, 4, 5], [3, 2, 2, 5, 7]); // [2, 5]
*/

function intersect(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }
  var result = [];
  var len = arr1.length;
  for (var i = 0; i < len; i++) {
    var elem = arr1[i];
    if (arr2.indexOf(elem) > -1 && result.indexOf(elem) == -1) {
      result.push(elem);
    }
  }
  return result;
}

export {arrayIntersect as default};
