module.exports = partition;

/*
    partition([1, 5, 2, 4, 3], n => n > 3); // [[5, 4],[1, 2, 3]]
    partition(['a', 1, 2, 'b'], x => typeof x == 'string'); // [['a', '3'],[2, 3]]
    partition([1, 2, 3, 4], x => typeof x == 'number'); // [[1, 2, 3, 4],[]]
    partition([1, 2, 3, 4], x => typeof x == 'string'); // [[], [1, 2, 3, 4]]
    partition([], n => n > 3); // [[], []]
    partition({a: 1, b: 2}, n => n > 1); // throws
    partition(null, n => n > 1); // throws
    partition(undefined, n => n > 1); // throws
*/

function partition(arr, fn) {
  if (!Array.isArray(arr)) {
    throw new Error('expected first argument to be an array');
  }
  if (typeof fn != 'function') {
    throw new Error('expected second argument to be a function');
  }
  var first = [];
  var second = [];
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    var nextValue = arr[i];
    if (fn(nextValue)) {
      first.push(nextValue);
    } else {
      second.push(nextValue);
    }
  }
  return [first, second];
}
