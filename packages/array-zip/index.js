module.exports = zip;

/*
  zip([1, 2, 3]); // [[1], [2], [3]]
  zip([1, 2, 3], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b'], [3, 'c']]
  zip([1, 2], ['a', 'b'], [true, false]); //[[1, 'a', true], [2, 'b', false]]

  zip([1, 2, 3], ['a', 'b'], [true]);
  // [[1, 'a', true], [2, 'b', undefined], [3, undefined, undefined]]

  zip(undefined, {}, false, 1, 'foo'); // throws
  zip([1, 2], ['a', 'b'], undefined, {}, false, 1, 'foo'); // throws
*/

function zip() {
  var result = [];
  var args = Array.prototype.slice.call(arguments);
  var argsLen = args.length;
  var maxLen = 0;
  var i, j;

  if (!argsLen) {
    throw new Error('zip requires at least one argument');
  }

  for (i = 0; i < argsLen; i++) {
    if (!Array.isArray(args[i])) {
      throw new Error('all arguments must be arrays');
    }
    var arrLen = args[i].length;
    if (arrLen > maxLen) {
      maxLen = arrLen;
    }
  }

  for (i = 0; i < maxLen; i++) {
    var group = [];
    for (j = 0; j < argsLen; j++) {
      if (!Array.isArray(args[j])) {
        throw new Error('all arguments must be arrays');
      }
      group[j] = args[j][i];
    }
    result[i] = group;
  }

  return result;
}
