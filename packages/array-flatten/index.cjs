module.exports = flatten;

/*
  flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

function flattenHelper(arr, depth) {
  var stack = arr.slice();
  var result = [];

  while (stack.length) {
    var item = stack.pop();

    if (Array.isArray(item) && depth > 0) {
      stack.push.apply(stack, item);
      depth--;
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}

function flatten(arr, depth) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }

  if (depth !== undefined && typeof depth !== 'number') {
    throw new Error('depth expects a number');
  }

  return flattenHelper(arr, typeof depth === 'number' ? depth : Infinity);
}
