var arrayCompact = compact;

/*
  compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]); // [1, 2, 3, 4, 5]
  compact([1, 2, [], 4, {}]); // [1, 2, [], 4, {}]
  compact([]); // []
  compact({}); // throws
*/

function compact(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  var result = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var elem = arr[i];
    if (elem) {
      result.push(elem);
    }
  }
  return result;
}

export {arrayCompact as default};
