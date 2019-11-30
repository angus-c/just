var test = require('../util/test')(__filename);
var percentile = require('../../packages/array-percentile');

test('array of numbers where percentile falls exactly on an index', function(t) {
  t.plan(5);
  t.equal(percentile([1, 2, 3, 4, 5], 30), 2);
  t.equal(percentile([1, 5, 2, 4, 3], 50), 3);
  t.equal(percentile([5, 4, 1, 3, 2], 70), 4);
  t.equal(percentile([1, 1, 1, 1, 1], 17), 1);
  t.equal(percentile([-4.2, -4.2, -4.2, -4.2, -4.2], 67), -4.2);
  t.end();
});

test('array of numbers where percentile falls outside outer bounds', function(t) {
  t.plan(3);
  t.equal(percentile([0.1, 2, 93, 14.98, 7], 4), 0.1);
  t.equal(percentile([0.1, 2, 93, 14.98, 7], 94), 93);
  t.equal(percentile([44, -2.91, 7, 7, -2.91], 3), -2.91);
  t.end();
});

test('array of numbers where percentile falls between indices', function(t) {
  t.plan(5);
  t.equal(percentile([1, 2, 3, 4, 5], 25), 1.75);
  t.equal(percentile([5, 4, 1, 3, 2], 75), 4.25);
  t.equal(percentile([1, 2, 3, 4, 5], 44), 2.7);
  t.equal(percentile([100, 101, 92, 4, 102, 66, 66], 17).toFixed(2), '46.78');
  t.equal(percentile([100, 101, -92, 4, 102, 32], 50), 66);
  t.end();
});

test('list of numeric arguments throws', function(t) {
  t.plan(2);
  t.throws(function() {
    percentile(1, 2, 3, 4, 5, 50);
  });
  t.throws(function() {
    percentile(1, 10);
  });
  t.end();
});

test('non numeric values throw', function(t) {
  t.plan(5);
  t.throws(function() {
    percentile([1, '2', 3, 4, 5], 50);
  });
  t.throws(function() {
    percentile([], 20);
  });
  t.throws(function() {
    percentile([false, true], 66);
  });
  t.throws(function() {
    percentile([{}], 66);
  });
  t.throws(function() {
    percentile(null, 40);
  });
  t.end();
});
