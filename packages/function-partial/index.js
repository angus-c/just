module.exports = partial;

/*
  const cubedRoot = partial(Math.pow, _, 1/3);
  cubedRoot(64); // 4

  const getRoot = partial(Math.pow, 64);
  getRoot(1/2); // 8
  */

function partial(fn /*, arg1, arg2 etc */) {
  var partialArgs = [].slice.call(arguments, 1);

  if (!partialArgs.length) {
    return fn;
  }

  return function() {
    var args = [].slice.call(arguments);
    var argsIndex = 0;
    var derivedArgs = [];

    for (var i = 0; i < partialArgs.length; i++) {
      var thisPartialArg = partialArgs[i];

      derivedArgs[i] =
        thisPartialArg === undefined ? args[argsIndex++] : thisPartialArg;
    }

    if (argsIndex < args.length) {
      derivedArgs = derivedArgs.concat(args.slice(argsIndex));
    }

    return fn.apply(this, derivedArgs);
  };
}
