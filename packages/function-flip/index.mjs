var functionFlip = flip;

/*
  flip(Array)('a', 'b') // ['b', 'a'];
  flip(console.log)(1, 2, 3) // 2, 1, 3
*/

function flip(fn) {
  return function() {
    var first = arguments[0];
    var second = arguments[1];
    var rest = [].slice.call(arguments, 2);
    return fn.apply(this, [second, first].concat(rest));
  };
}

export {functionFlip as default};
