module.exports = debounce;

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    if (!wait) {
      return func.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!callNow) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return func.apply(this, arguments);
    }
  };
};
