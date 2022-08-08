var test = require('../util/test')(__filename);
var variance = require('../../packages/array-variance');

test('array of numbers returns variance value', function(t) {
  t.plan(4);
  t.equal(variance([1, 2, 3, 2, 4, 1]).toFixed(4), '1.3667');
  t.equal(variance([3, 2.5, 1]).toFixed(4), '1.0833');
  t.equal(variance([1, 2, 3, 4, 5, 6]), 3.5);
  t.equal(variance([1, 2, 3, 4, 5, -6]), 15.5);
  t.end();
});

test('list of numeric arguments variance value', function(t) {
  t.plan(4);
  t.equal(variance(1, 8, 6), 13);
  t.equal(variance(100, 100, 100.1, 100).toFixed(4), '0.0025');
  t.equal(variance(-1, -2), 0.5);
  t.equal(variance(0.1, 0.2, 0.3).toFixed(2), '0.01');
  t.end();
});

test('one or fewer values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    variance([1]);
  });
  t.throws(function() {
    variance(17.1);
  });
  t.throws(function() {
    variance();
  });
  t.throws(function() {
    variance([]);
  });
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    variance(['1', '2', '3']);
  });
  t.throws(function() {
    variance(['a', 'b', 'c']);
  });
  t.throws(function() {
    variance(undefined);
  });
  t.throws(function() {
    variance([NaN, NaN]);
  });
  t.end();
});
