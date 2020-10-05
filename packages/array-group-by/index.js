module.exports = groupBy;

/*
  groupBy([6.1, 4.2, 6.3], Math.floor); // { '4': [4.2], '6': [6.1, 6.3] }
  groupBy([1,2,3,4,5,6], function(i) { return i % 2 }); // { '0': [2, 4, 6], '1': [1, 3, 5] }
*/

function groupBy(arr, cb) {
  if (!Array.isArray(arr)) {
    throw new Error('just-group-by expects an array for first argument');
  }

  if (typeof cb !== 'function') {
    throw new Error('just-group-by expects a function for second argument');
  }

  var result = {};
  var size = arr.length;

  for (var i = 0; i < size; i++) {
    var item = arr[i];
    var bucketCategory = cb(item);
    var bucket = result[bucketCategory];

    if (!bucket) {
      result[bucketCategory] = [];
    }

    result[bucketCategory].push(item);
  }

  return result;
};
