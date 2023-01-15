module.exports = debounce;

function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;
  var shouldUseRaf = !wait && typeof window !== 'undefined';

  var clear = function() {
    if (timeout) {
      shouldUseRaf ? cancelAnimationFrame(timeout) : clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  var flush = function() {
    var call = debouncedFn;
    clear();

    if (call) {
      call();
    }
  };

  var timer = function(fn, wait) {
    return shouldUseRaf ? requestAnimationFrame(fn) : setTimeout(fn, wait);
  };

  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();

    debouncedFn = function() {
      fn.apply(context, args);
    };

    timeout = timer(function() {
      timeout = null;

      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
}
