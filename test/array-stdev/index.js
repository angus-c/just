var test = require('../util/test')(__filename);
var stdev = require('../../packages/array-stdev');

test('array of numbers returns standard deviation', function(t) {
  t.plan(4);
  t.equal(stdev([1, 2, 3]), 1);
  t.equal(stdev([1, 2, 3, 2, 4, 1]).toFixed(4), '1.1690');
  t.equal(stdev([3, 2.5, 1]).toFixed(4), '1.0408');
  t.equal(stdev([1, 2, 3, 4, 5, 6]).toFixed(4), '1.8708');
  t.end();
});

test('list of numeric arguments returns standard deviation', function(t) {
  t.plan(4);
  t.equal(stdev(2, 6, 4), 2);
  t.equal(stdev(10, 10, 10, 10), 0);
  t.equal(stdev(-1, -2, -3), 1);
  t.equal(stdev(0.1, 0.2, 0.3).toFixed(2), '0.10');
  t.end();
});

test('one or fewer values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    stdev([1]);
  });
  t.throws(function() {
    stdev(17.1);
  });
  t.throws(function() {
    stdev();
  });
  t.throws(function() {
    stdev([]);
  });
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    stdev(['1', '2', '3']);
  });
  t.throws(function() {
    stdev(['a', 'b', 'c']);
  });
  t.throws(function() {
    stdev(undefined);
  });
  t.throws(function() {
    stdev([NaN, NaN]);
  });
  t.end();
});
