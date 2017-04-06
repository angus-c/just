var test = require('tape');
var flip = require('../../packages/function-flip');

test('flips the first two args', function (t) {
  t.plan(1);
  var flippedArray = flip(Array);
  t.same(flippedArray(0, 1), [1, 0]);
  t.end();
});

test('includes the rest of the args in original order', function (t) {
  t.plan(1);
  var flippedArray = flip(Array);
  t.same(flippedArray(2, 3, 5, 8, 13), [3, 2, 5, 8, 13]);
  t.end();
});
