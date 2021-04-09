module.exports = debounce;

function debounce(fn, wait, callFirst) {
  var timeout = null;

  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;

    clear();

    timeout = setTimeout(function() {
      timeout = null;

      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };

  debounceWrapper.cancel = clear;

  return debounceWrapper;
}
