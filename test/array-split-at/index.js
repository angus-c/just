var test = require('../util/test')(__filename);
var splitAt = require('../../packages/array-split-at');

test('splits array into two at a given position within the array bounds', function(
  t
) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4, 5]]);
  t.end();
});

test('splits array into two at a given position outside the array bounds', function(
  t
) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], 10), [[1, 2, 3, 4, 5], []]);
  t.end();
});

test('splits array into two at a given negative position within the array bounds', function(
  t
) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], -1), [[1, 2, 3, 4], [5]]);
  t.end();
});

test('splits array into two at a given negative position outside the array bounds', function(
  t
) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], -10), [[], [1, 2, 3, 4, 5]]);
  t.end();
});

test('splits array into two at an empty array', function(t) {
  t.deepEqual(splitAt([], 2), [[], []]);
  t.end();
});

test("undefined inputs don't throw and return undefined", function(t) {
  t.plan(3);
  t.equal(splitAt(), undefined);
  t.equal(splitAt(undefined), undefined);
  t.equal(splitAt(null), undefined);
  t.end();
});
