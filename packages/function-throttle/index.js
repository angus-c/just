module.exports = throttle;

function throttle(fn, interval, options) {
  var timeoutId = null;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing);

  if (leading == null) {
    leading = true; // default
  }

  if (trailing == null) {
    trailing = !leading; //default
  }

  if (leading == true) {
    trailing = false; // forced because there should be invocation per call
  }

  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;

    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;

        if (trailing) {
          return fn.apply(context, args);
        }
      }, interval);
    }

    if (callNow) {
      callNow = false;
      return fn.apply(context, args);
    }
  };

  throttleWrapper.cancel = cancel;

  return throttleWrapper;
}
