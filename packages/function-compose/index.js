module.exports = compose;

/*
const sqRootBiggest = compose(Math.max, Math.sqrt, Math.trunc);
sqRootBiggest(10, 5); // 3
sqRootBiggest(7, 0, 16); // 4
*/

function compose(fn1, fn2 /*, fn3, etc */) {
  if (!arguments.length) {
    throw new Error(
      'expected at least one (and probably more) function arguments'
    );
  }
  var fns = arguments;

  return function() {
    var result = fns[0].apply(this, arguments);
    var len = fns.length;
    for (var i = 1; i < len; i++) {
      result = fns[i].call(this, result);
    }
    return result;
  };
}
