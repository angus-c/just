var test = require('../util/test')(__filename);
var split = require('../../packages/array-split');

test('should return empty array if empty array is passed as first arg', function(t) {
  t.plan(3);
  t.deepEqual(split([]), []);
  t.deepEqual(split([], 4), []);
  t.deepEqual(split([], null), []);
  t.end();
});

test('if only array is passed as argument, treat n as the length of array', function(t) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9]), [[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400]), [[100, 100, 100, 200, 300, 400]]);
  t.end();
});

test('if second argument is null, treat n as the length of array', function(t) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], null), [[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], null), [[100, 100, 100, 200, 300, 400]]);
  t.end();
});

test('splits array into groups of n size if array length divisible by n', function(t) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], 2), [[100, 100], [100, 200], [300, 400]]);
  t.end();
});

test('splits array into groups of n size plus a trailing array of length < n', function(t) {
  t.plan(2);
  t.deepEqual(split([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), [[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  t.deepEqual(split([100, 100, 100, 200, 300, 400], 4), [[100, 100, 100, 200], [300, 400]]);
  t.end();
});

test('throws if first argument is not an array', function(t) {
  t.plan(3);
  t.throws(function() {
    split(undefined, 2);
  });
  t.throws(function() {
    split(null, 4);
  });
  t.throws(function() {
    split({}, 3);
  });
  t.end();
});

test('throws if second argument is not null/undefined or a number', function(t) {
  t.plan(2);
  t.throws(function() {
    split([1, 2, 3, 4], '2');
  });
  t.throws(function() {
    split([1, 2, 3, 4], {});
  });
  t.end();
});

test('throws for an explicitly nonpositive group size', function(t) {
  t.plan(10);
  var sizes = [0, -0, -1, -0.5, -Infinity];
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    t.throws(function() {
      split([1, 2, 3], size);
    }, /expected a positive number/);
    t.throws(function() {
      split([], size);
    }, /expected a positive number/);
  }
  t.end();
});

test('keeps default and positive group sizes unchanged', function(t) {
  t.plan(5);
  var values = [1, 2, 3];
  t.deepEqual(split(values, 1), [[1], [2], [3]]);
  t.deepEqual(split(values, Infinity), [[1, 2, 3]]);
  t.deepEqual(split(values, undefined), [[1, 2, 3]]);
  t.deepEqual(split([], undefined), []);
  t.deepEqual(values, [1, 2, 3]);
  t.end();
});
