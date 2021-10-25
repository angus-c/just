module.exports = index;

/*
  index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');
  // {first: {id: 'first', val: 1}, second: {id: 'second', val: 2}}
  index([{id: 'first', val: 1}, null], 'id'); // {first: {id: 'first', val: 1}}
  index([], 'id'); // {}
  index([], null); // throws
  index({}, 'id'); // throws
*/

function index(arr, key) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array for first argument');
  }
  if (typeof key != 'string') {
    throw new Error('expected a string for second argument');
  }
  var result = {};
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var index = arr[i] && arr[i][key];

    if (index !== undefined && index !== null) {
      result[index] = arr[i];
    }
  }
  return result;
}
