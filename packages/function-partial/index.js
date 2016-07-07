module.exports = partial;

/*
  var cubedRoot = partial(Math.pow, _, 1/3);
  cubedRoot(10).toFixed(1); // 56.7
  cubedRoot(35).toFixed(1); // 16.2
*/

var globalObj = global || self;
globalObj.___ = {};

function partial(fn /*, arg1, arg2 etc */) {
  var partialArgs = [].slice.call(arguments, 1);
  if (!partialArgs.length) {
    return fn;
  }
  return function () {
    var argIndex = 0, derivedArgs = [];
    for (var i = 0; i < partialArgs.length; i++) {
      var thisPartialArg = partialArgs[i];
      derivedArgs[i] = thisPartialArg === globalObj.___ ? arguments[argIndex++] : thisPartialArg;
    }
    return fn.apply(this, derivedArgs);
  };
}
