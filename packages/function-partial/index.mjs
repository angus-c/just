var functionPartial = partial;

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
    var derivedArgs = [];

    for (var i = 0; i < partialArgs.length; i++) {
      var thisPartialArg = partialArgs[i];

      derivedArgs[i] =
        thisPartialArg === undefined ? args.shift() : thisPartialArg;
    }

    return fn.apply(this, derivedArgs.concat(args));
  };
}

export {functionPartial as default};
