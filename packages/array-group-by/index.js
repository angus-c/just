module.exports = groupBy;

function groupBy(arr, cb) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array for first argument');
  }

  if (typeof cb !== 'function') {
    throw new Error('expected a function for second argument');
  }

  var result = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var bucketCategory = cb(item);
    var bucket = result[bucketCategory];

    if (!Array.isArray(bucket)) {
      result[bucketCategory] = [item];
    } else {
      result[bucketCategory].push(item);
    }
  }

  return result;
};
