var arraySortBy = sortBy;

function handleSort(iteratee) {
  return function(a, b) {
    var keyA = typeof iteratee === 'string' ? a[iteratee] : iteratee(a);
    var keyB = typeof iteratee === 'string' ? b[iteratee] : iteratee(b);

    if (typeof keyA === 'string' && typeof keyB === 'string') {
      var valueA = keyA.toUpperCase();
      var valueB = keyB.toUpperCase();

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    }

    return keyA - keyB;
  };
}

function sortBy(arr, iteratee) {
  if (!Array.isArray(arr)) {
    throw new Error('arr should be an array');
  }

  if (iteratee !== undefined && (typeof iteratee !== 'string' && typeof iteratee !== 'function')) {
    throw new Error('iteratee should be a string or a function');
  }

  if (arr.length <= 1) {
    return arr;
  }

  var copied = arr.slice();

  if (!iteratee) {
    return copied.sort(function(a, b) {
      return a - b;
    });
  }

  return copied.sort(handleSort(iteratee));
}

export {arraySortBy as default};
