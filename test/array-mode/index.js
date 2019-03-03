var test = require('../util/test')(__filename);
var mode = require('../../packages/array-mode');
var compare = require('../../packages/collection-compare');

test('array of numbers with one mode', function(t) {
  t.plan(3);
  t.equal(mode([1, 2, 3, 2]), 2);
  t.equal(mode([1, 1, -3, -3, -3]), -3);
  t.equal(mode([1]), 1);
  t.end();
});

test('list of number arguments with one mode', function(t) {
  t.plan(3);
  t.equal(mode(1, 1, 2, 3, 4), 1);
  t.equal(mode(100, 100, 100), 100);
  t.equal(mode(3), 3);
  t.end();
});

test('array of numbers with multiple modes', function(t) {
  t.plan(3);
  t.ok(compare(mode([1, 2, 3, 4]), [1, 2, 3, 4]));
  t.ok(compare(mode([4, 3, 2, 1]), [1, 2, 3, 4]));
  t.ok(compare(mode([-3, -3, -4, -4]), [-4, -3]));
  t.end();
});

test('list of number arguments with multiple modes', function(t) {
  t.plan(3);
  t.ok(compare(mode(1, 2, 34, 4), [1, 2, 4, 34]));
  t.ok(compare(mode(0.1, 0.01, 0.001), [0.001, 0.01, 0.1]));
  t.ok(compare(mode(-4, -4, -3, -3), [-4, -3]));
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(3);
  t.throws(function() {
    mode([1, '2', 3, 4, 5]);
  });
  t.throws(function() {
    mode({a: 2}, {b: 3});
  });
  t.throws(function() {
    mode(undefined);
  });
  t.end();
});
