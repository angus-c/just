module.exports = debounce;

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    if (wait === 0) {
      return func.apply(context, args);
    }
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};
