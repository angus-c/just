module.exports = curry;

/*
  function converter(ratio, input) {
    return (input*ratio).toFixed(1);
  }
  var milesToKm = curry(converter, 1.62);
  milesToKm(35); // 56.7
  milesToKm(10); // 16.2
*/

function curry(fn /* arg1, arg2 etc */) {
  var fnArgs = [].slice.call(arguments, 1);
  if (fnArgs.length >= fn.length) {
    return fn.apply(this, fnArgs);
  }
  return function currier() {
    var curriedArgs = [].slice.call(arguments);
    var args = fnArgs.concat(curriedArgs);
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function () {
        return currier.apply(this, curriedArgs.concat([].slice.call(arguments)));
      };
    }
  };
}
