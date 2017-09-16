var test = require('../util/test')(__filename);
var split = require('../../packages/array-split');

test('should return empty array if empty array is passed as first arg', function(
  t
) {
  t.plan(3);
  t.deepEqual(split([]), []);
  t.deepEqual(split([], 4), []);
  t.deepEqual(split([], null), []);
  t.end();
});

test('if only array is passed as argument, treat n as the length of array', function(
  t
) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9]), [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400]), [
    [100, 100, 100, 200, 300, 400],
  ]);
  t.end();
});

test('splits array into groups of n size if array length divisible by n', function(
  t
) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], 2), [
    [100, 100],
    [100, 200],
    [300, 400],
  ]);
  t.end();
});

test('splits array into groups of n size plus a trailing array of length < n', function(
  t
) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9],
  ]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], 4), [
    [100, 100, 100, 200],
    [300, 400],
  ]);
  t.end();
});

test('can handle n passed in as a string value', function(t) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], '3'), [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], '2'), [
    [100, 100],
    [100, 200],
    [300, 400],
  ]);
  t.end();
});

test('returns undefined if no args, or if non-array value is passed as first arg', function(
  t
) {
  t.plan(4);
  t.equals(split(), undefined);
  t.equals(split('hello'), undefined);
  t.equals(split(2000), undefined);
  t.equals(split({a: 5, b: 7}), undefined);
  t.end();
});
