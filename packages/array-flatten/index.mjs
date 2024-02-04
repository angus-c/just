var arrayFlatten = flatten;

/*
  flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

function flattenHelper(arr, depth) {
  var stack = arr.slice();
  var stackContainsArray = true;

  for (; depth > 0 && stackContainsArray; depth--) {
    stackContainsArray = false;
    var nextStack = [];

    while (stack.length) {
      var item = stack.shift();
      if (Array.isArray(item)) {
        stackContainsArray = true;
        nextStack.push.apply(nextStack, item);
      } else {
        nextStack.push(item);
      }
    }

    stack = nextStack;
  }

  return stack;
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

export {arrayFlatten as default};
