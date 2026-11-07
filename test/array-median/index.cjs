var test = require('../util/test')(__filename);
var median = require('../../packages/array-median');

// median([1, 2, 3, 4, 5]); // 3
// median([3, 2, 1]); // 2
// median(1, 2, 3, 4); // 2.5
// median(['3', 2, 1]); // throws
// median(); // throws

test('array of numbers (length is odd) returns middle sorted value', function(t) {
  t.plan(4);
  t.equal(median([1, 2, 3, 4, 5]), 3);
  t.equal(median([5, 4, 1, 2, 4]), 4);
  t.equal(median([-1, -8, 312, 4, 5, 0, 0, 2, 1]), 1);
  t.equal(median(5), 5);
  t.end();
});

test('array of numbers (length is even) returns mean of middle 2 sorted values', function(t) {
  t.plan(2);
  t.equal(median([1, 2, 4, 5]), 3);
  t.equal(median([-2, -1, -2, -1]), -1.5);
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    median([1, '2', 3, 4, 5]);
  });
  t.throws(function() {
    median([1, NaN, 3, 4, 5]);
  });
  t.throws(function() {
    median({a: 2}, {b: 3});
  });
  t.throws(function() {
    median(undefined);
  });
  t.end();
});

test('avoids overflow when averaging finite middle values', function(t) {
  t.plan(6);
  var max = Number.MAX_VALUE;
  t.equal(median([max, max]), max);
  t.equal(median([-max, -max]), -max);
  t.equal(median([1e308, 1.2e308]), 1.1e308);
  t.equal(median([-1.2e308, -1e308]), -1.1e308);
  t.equal(median([0, max, max, max]), max);
  t.equal(median([-max, -max, -max, 0]), -max);
  t.end();
});
