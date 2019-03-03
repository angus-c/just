var test = require('../util/test')(__filename);
var mean = require('../../packages/array-mean');

test('array of numbers returns mean', function(t) {
  t.plan(3);
  t.equal(mean([1, 2, 3, 2, 4, 1]).toFixed(4), '2.1667');
  t.equal(mean([4.5, -1.1, 98.6]), 34);
  t.equal(mean([4]), 4);
  t.end();
});

test('list of numberic arguments returns mean', function(t) {
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
    mean({});
  });
  t.throws(function() {
    mean(undefined);
  });
  t.end();
});
