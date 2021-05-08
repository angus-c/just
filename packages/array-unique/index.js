module.exports = unique;

/*
  unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]
  var a = {a: 3};
  var b = {b: 4};
  var c = {c: 5};
  unique([a, a, b, c, b]); // [a, b, c]
  unique([1, '1', 2, '2', 3, 2]); // [1, '1', 2, '2', 3]
  // declaring sorted array for performance
  unique([1, 1, '1', 2, 2, 5, '5', '5'], true); // [1, '1', 2, 5, '6']
  // declaring strings array for performance
  unique(['a', 'c', 'b', 'c', 'a'], false, true); // ['a', 'b', 'c']
*/

function unique(arr, sorted, strings) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array for the first argument');
  }
  if (sorted != null && typeof sorted != 'boolean') {
    throw new Error('expected a boolean, null or undefined for the second argument');
  }
  if (strings != null && typeof strings != 'boolean') {
    throw new Error('expected a boolean, null or undefined for the third argument');
  }
  if (!sorted && strings && arr[0] !== Object(arr[0])) {
    return stringUnique(arr);
  }
  var result = [],
    duplicate,
    seenNaN,
    lastAdded;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var elem = arr[i];
    if (typeof elem == 'number' && isNaN(elem)) {
      duplicate = seenNaN;
      seenNaN = true;
    }
    duplicate = duplicate || (lastAdded && lastAdded === elem);
    if (!duplicate && !sorted) {
      duplicate = result.indexOf(elem) > -1;
    }
    if (!duplicate) {
      result.push(elem);
      lastAdded = elem;
    } else {
      duplicate = false;
    }
  }
  return result;
}

function stringUnique(arr) {
  var lookup = {};
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    lookup[arr[i]] = true;
  }
  return Object.keys(lookup);
}
