module.exports = memoizeOne;

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

function memoizeOne(fn, isEqual) {
  var wasCalled = false;
  var lastThis = null;
  var lastArgs = null;
  var lastResult = null;
  var _isEqual = isEqual || defaultEqual;

  return function() {
    var args = [].slice.call(arguments);

    if (!wasCalled || this !== lastThis || !_isEqual(lastArgs, args)) {
      lastThis = this;
      lastArgs = args;
      lastResult = fn.apply(this, args);
      wasCalled = true;
    }

    return lastResult;
  };
}
