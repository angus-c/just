var test = require('../util/test')(__filename);
var skewness = require('../../packages/array-skewness');

test('array of numbers returns skewness', function(t) {
  t.plan(4);
  t.equal(skewness([10, 30, 50, 70]), 0);
  t.equal(skewness([1, 2, 3, 2, 4, 1]).toFixed(4), '0.4277');
  t.equal(skewness([1, 2, 3, 4, 9]).toFixed(4), '0.7706');
  t.equal(skewness([-3, 1, -2]).toFixed(4), '0.9608');
  t.end();
});

test('list of numeric arguments returns skewness', function(t) {
  t.plan(4);
  t.equal(skewness(2, 6, 4), 0);
  t.equal(skewness(4, 4, 4, 19), 1.5);
  t.equal(skewness(-1, -2, -9).toFixed(4), '-1.3765');
  t.equal(skewness(34, 0, 0, 0, 0).toFixed(4), '1.3416');
  t.end();
});

test('identical numbers returns NaN', function(t) {
  t.plan(2);
  t.equal(String(skewness(10, 10, 10, 10)), 'NaN');
  t.equal(String(skewness(0, 0, 0)), 'NaN');
  t.end();
});

test('one or fewer values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    skewness([1]);
  });
  t.throws(function() {
    skewness(17.1);
  });
  t.throws(function() {
    skewness();
  });
  t.throws(function() {
    skewness([]);
  });
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(4);
  t.throws(function() {
    skewness(['1', '2', '3']);
  });
  t.throws(function() {
    skewness(['a', 'b', 'c']);
  });
  t.throws(function() {
    skewness(undefined);
  });
  t.throws(function() {
    skewness([NaN, NaN]);
  });
  t.end();
});
