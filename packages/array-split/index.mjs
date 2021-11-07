var arraySplit = split;

/*
    split([]); // []
    split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
    split([1, 2, 3, 4, 5], null); // [[1, 2, 3, 4, 5]]
    split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    split(['a', 'b', 'c', 'd', 'e'], 2); // [['a', 'b'], ['c', 'd'], ['e']]
    split([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
    split(null, 3); // throws
    split([1, 2, 3, 4, 5, 6], '3'); // throws
    split([1, 2, 3, 4, 5, 6], {}); // throws
*/

function split(arr, n) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array for the first argument');
  }
  if (n != null && typeof n != 'number') {
    throw new Error('expected a number or null/undefined for the second argument');
  }
  n = n != null ? n : arr.length;
  var len = arr.length;
  var groups = [];
  for (var i = 0; i < len; i += n) {
    groups.push(arr.slice(i, i + n));
  }
  return groups;
}

export {arraySplit as default};
