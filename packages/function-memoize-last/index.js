module.exports = memoizeLast;

function defaultEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function memoizeLast(fn, isEqual) {
  if (typeof fn !== 'function') {
    throw new Error('fn should be a function');
  }

  if (isEqual !== undefined && typeof isEqual !== 'function') {
    throw new Error('isEqual should be a function');
  }

  var lastThis = null;
  var lastArgs = null;
  var lastResult = null;
  var _isEqual = isEqual || defaultEqual;

  return function() {
    var args = [].slice.call(arguments);

    if (!lastArgs || this !== lastThis || !_isEqual(lastArgs, args)) {
      lastThis = this;
      lastArgs = args;
      lastResult = fn.apply(this, args);
    }

    return lastResult;
  };
}
