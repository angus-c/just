module.exports = split;

/*
    split([]); // []
    split([1,2,3,4,5]); // [[1,2,3,4,5]]
    split([1,2,3,4,5,6,7,8,9], 3); [[1,2,3],[4,5,6],[7,8,9]]
    split([1,2,3,4,5,6,7,8,9], "3"); [[1,2,3],[4,5,6],[7,8,9]]
    split(['a','b','c','d','e'], 2); [['a','b'],['c','d'],['e']]
    split([1,2,3,4,5,6,7,8], 3); [[1,2,3],[4,5,6],[7,8]]
*/

function split(arr, n) {
  if (!Array.isArray(arr)) return undefined;
  n = +n || arr.length;
  var length = arr.length;
  var groups = [];
  for (var i = 0; i < length; i += n) {
    groups.push(arr.slice(i, i + n));
  }
  return groups;
}
