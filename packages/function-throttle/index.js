module.exports = throttle;

function throttle(fn, interval, callFirst) {
  var wait = false;
  var callNow = false;
  return function() {
    callNow = callFirst && !wait;
    var context = this;
    var args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(function() {
        wait = false;
        if (!callFirst) {
          return fn.apply(context, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, arguments);
    }
  };
}
