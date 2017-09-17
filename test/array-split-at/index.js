var test = require('../util/test')(__filename);
var splitAt = require('../../packages/array-split-at');

test('splits array into two at a given position within the array bounds', function(t) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4, 5]]);
  t.end();
});

test('splits array into two at a given position outside the array bounds', function(t) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], 10), [[1, 2, 3, 4, 5], []]);
  t.end();
});

test('splits array into two at a given negative position within the array bounds', function(t) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], -1), [[1, 2, 3, 4], [5]]);
  t.end();
});

test('splits array into two at a given negative position outside the array bounds', function(t) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5], -10), [[], [1, 2, 3, 4, 5]]);
  t.end();
});

test('when no second argument, all elements go to second array', function(t) {
  t.deepEqual(splitAt([1, 2, 3, 4, 5]), [[], [1, 2, 3, 4, 5]]);
  t.end();
});

test('splits array into two at an empty array', function(t) {
  t.deepEqual(splitAt([], 2), [[], []]);
  t.end();
});

test('throws if first argument is not an array', function(t) {
  t.plan(3);
  t.throws(function() {
    splitAt(undefined, 2);
  });
  t.throws(function() {
    splitAt(null, 4);
  });
  t.throws(function() {
    splitAt({}, 3);
  });
  t.end();
});

test('throws if second argument is not null/undefined or a number', function(t) {
  t.plan(2);
  t.throws(function() {
    splitAt([1, 2, 3, 4], '2');
  });
  t.throws(function() {
    splitAt([1, 2, 3, 4], {});
  });
  t.end();
});
