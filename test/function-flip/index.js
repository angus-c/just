var test = require('../util/test')(__filename);
var flip = require('../../packages/function-flip');

test('flips the first two args', function(t) {
  t.plan(1);
  var flippedArray = flip(Array);
  t.same(flippedArray(0, 1), [1, 0]);
  t.end();
});

test('includes the rest of the args in original order', function(t) {
  t.plan(1);
  var flippedArray = flip(Array);
  t.same(flippedArray(2, 3, 5, 8, 13), [3, 2, 5, 8, 13]);
  t.end();
});

test('does nothing with zero arity functions', function(t) {
  t.plan(1);
  function fn() {
    return 21;
  }
  t.equal(21, flip(fn)(34));
  t.end();
});

test('still flips the first two args of a variadic function', function(t) {
  t.plan(1);
  function pair() {
    return [].slice.call(arguments, 0, 2);
  }
  t.same([55, 89], flip(pair)(89, 55));
  t.end();
});
