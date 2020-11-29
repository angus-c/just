module.exports = throttle;

function throttle(fn, interval, options) {
  var wait = false;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing)  
  if (leading == null) {
    leading = true; // default
  }
  if (trailing == null) {
    trailing = !leading; //default
  }  
  return function() {
    callNow = leading && !wait;
    var context = this;
    var args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(function() {
        wait = false;
        if (trailing) {
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
