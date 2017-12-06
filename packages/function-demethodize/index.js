module.exports = demethodize;

/*
var trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn); // ['hello', 'goodbye', 'hello again']

var circle = {
  volumeOfCylinder: function (height) {
    return this.radius * this.radius * Math.PI * height;
  }
};
var volume = demethodize(circle.volumeOfCylinder)({radius: 3}, 4);

demethodize({}); // undefined
demethodize(undefined); // undefined
*/

function demethodize(fn) {
  if (typeof fn != 'function') {
    throw new Error('expected a function, got', fn);
  }
  return function(thisValue /*, arg1, arg2, ...*/) {
    if (thisValue == null) {
      throw new Error('expected a value for 1st arg, got ' + thisValue);
    }
    var args = [].slice.call(arguments);
    return fn.apply(args.shift(), args);
  };
}
