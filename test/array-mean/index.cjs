var test = require('../util/test')(__filename);
var mean = require('../../packages/array-mean');

test('array of numbers returns mean', function(t) {
  t.plan(3);
  t.equal(mean([1, 2, 3, 2, 4, 1]).toFixed(4), '2.1667');
  t.equal(mean([4.5, -1.1, 98.6]), 34);
  t.equal(mean([4]), 4);
  t.end();
});

test('list of numeric arguments returns mean', function(t) {
  t.plan(3);
  t.equal(mean(1, 2, 5, 2, 4, 1), 2.5);
  t.equal(mean(100, 100, 100.1, 100), 100.025);
  t.equal(mean(-4), -4);
  t.end();
});

test('non-numeric values throw', function(t) {
  t.plan(3);
  t.throws(function() {
    mean([1, '2', 3, 4]);
  });
  t.throws(function() {
    mean({a: 2});
  });
  t.throws(function() {
    mean(undefined);
  });
  t.end();
});

test('finite means survive overflowing sums', function(t) {
  t.plan(8);
  var max = Number.MAX_VALUE;
  t.equal(mean([max, max]), max);
  t.equal(mean([-max, -max]), -max);
  t.equal(mean([max, max, max]), max);
  t.equal(mean([-max, -max, -max]), -max);
  t.equal(mean([max, max, -max, -max]), 0);
  t.equal(mean([max, max, 0, 0]), max / 2);
  t.equal(mean(max, max), max);
  t.equal(mean(-max, -max), -max);
  t.end();
});
