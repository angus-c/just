module.exports = index;

/*
  index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id'); // {first: {id: 'first', val: 1}, second: {id: 'second', val: 2}}
  index([{id: 'first', val: 1}, null], 'id'); // {first: {id: 'first', val: 1}}
  index([], 'id'); // {}
  index([], null); // undefined
  index({}, 'id'); // undefined
*/

function index(arr, key) {
  if (!Array.isArray(arr)) {
    return undefined;
  }

  if (!key || typeof key !== 'string') {
    return undefined;
  }

  var result = {};
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    var index = arr[i] && arr[i][key];

    if (index) {
      result[index] = arr[i];
    }
  }

  return result;
}
