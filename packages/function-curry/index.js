module.exports = curry;

/*
  function converter(ratio, input) {
    return (input*ratio).toFixed(1);
  }
  var curriedConverter = curry(converter)
  var milesToKm = curriedConverter(1.62);
  milesToKm(35); // 56.7
  milesToKm(10); // 16.2
*/

function curry(fn) {
  return function curried() {
    var args = [].slice.call(arguments);
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function() {
        return curried.apply(this, args.concat([].slice.call(arguments)));
      };
    }
  };
}
