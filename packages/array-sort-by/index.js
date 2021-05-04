module.exports = sortBy;

function handleSort(key) {
  return function(a, b) {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      var valueA = a[key].toUpperCase();
      var valueB = b[key].toUpperCase();

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    }

    return a[key] - b[key];
  };
}

function sortBy(arr, key) {
  if (!Array.isArray(arr)) {
    throw new Error('arr should be an array');
  }

  if (key !== undefined && typeof key !== 'string') {
    throw new Error('key should be a string');
  }

  if (arr.length <= 1) {
    return arr;
  }

  var copied = arr.slice();

  if (!key) {
    return copied.sort(function(a, b) {
      return a - b;
    });
  }

  return copied.sort(handleSort(key));
}
