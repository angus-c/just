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
  var args = Array.prototype.slice.call(arguments);
  var argsLen = args.length;
  var maxLen = 0;

  if (!argsLen) {
    throw new Error('zip requires at least one argument');
  }

  for (var i = 0; i < argsLen; i++) {
    if (!Array.isArray(args[i])) {
      throw new Error('all arguments must be arrays');
    }
    var arrLen = args[i].length;
    if (arrLen > maxLen) {
      maxLen = arrLen;
    }
  }

  var result = [];
  var group = [];
  var p1 = 0;
  var p2 = 0;

  while (p1 < maxLen) {
    group[p2] = args[p2][p1];

    if (p2 < argsLen - 1) {
      p2++;
    } else {
      p2 = 0;
      result[p1] = group;
      group = [];
      p1++;
    }
  }

  return result;
}
