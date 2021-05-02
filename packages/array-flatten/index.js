module.exports = flatten;

/*
  flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

function flattenHelper(arr, depth) {
  var result = [];
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    var elem = arr[i];

    if (Array.isArray(elem) && depth > 0) {
      result.push.apply(result, flattenHelper(elem, depth - 1));
    } else {
      result.push(elem);
    }
  }

  return result;
}

function flatten(arr, depth) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }

  if (depth !== undefined && typeof depth !== 'number') {
    throw new Error('depth expects a number');
  }

  var optionDepth = typeof depth === 'number' ? depth : Infinity;

  return flattenHelper(arr, optionDepth);
}
