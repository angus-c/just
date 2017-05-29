module.exports = throttle;

function throttle (fn, interval, immediate) {
  var wait = false;
  var callNow = false;
  return function () {
    var callNow = immediate && !wait;
    var context = this;
    var args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(function () {
        wait = false;
        return fn.apply(context, args);
      }, interval);
    }
    if (callNow) {
      return fn.apply(this, arguments);
    }
  }
}
