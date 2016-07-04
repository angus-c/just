module.exports = curry;

/*
  function converter(ratio, input) {
    return (input*ratio).toFixed(1);
  }
  var milesToKm = curry(converter, 1.62);
  milesToKm(35); // 56.7
  milesToKm(10); // 16.2
*/

function curry(fn /*, arg1, arg2 etc */) {
  var curriedArgs = [].slice.call(arguments, 1);
  if (!curriedArgs.length) {
    return fn;
  }
  return function () {
    return fn.apply(this, curriedArgs.concat([].slice.call(arguments)));
  };
}
