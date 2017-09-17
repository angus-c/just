var test = require('../util/test')(__filename);
var range = require('../../packages/array-range');

test('array range with one integer argument', function(t) {
  t.plan(2);
  var stop = 5;
  var negativeStop = -5;
  t.deepEqual(range(stop), [0, 1, 2, 3, 4]);
  t.deepEqual(range(negativeStop), [0, -1, -2, -3, -4]);
  t.end();
});

test('array range with two integer arguments', function(t) {
  t.plan(2);
  var start = 0;
  var stop = 5;
  var negativeStop = -5;
  t.deepEqual(range(start, stop), [0, 1, 2, 3, 4]);
  t.deepEqual(range(start, negativeStop), [0, -1, -2, -3, -4]);
  t.end();
});

test('array range with three integer arguments', function(t) {
  t.plan(2);
  var start = 0;
  var stop = 20;
  var negativeStop = -20;
  var step = 5;
  var negativeStep = -5;
  t.deepEqual(range(start, stop, step), [0, 5, 10, 15]);
  t.deepEqual(range(start, negativeStop, negativeStep), [0, -5, -10, -15]);
  t.end();
});

test('array range with three decimal arguments', function(t) {
  t.plan(2);
  var start = 0;
  var stop = 1.9;
  var negativeStop = -1.9;
  var step = 0.5;
  var negativeStep = -0.5;
  t.deepEqual(range(start, stop, step), [0, 0.5, 1, 1.5]);
  t.deepEqual(range(start, negativeStop, negativeStep), [0, -0.5, -1, -1.5]);
  t.end();
});

test('throws if any argument is not null/undefined or number', function(t) {
  t.plan(3);
  t.throws(function() {
    range('0', 3);
  });
  t.throws(function() {
    range(0, '3');
  });
  t.throws(function() {
    range(0, 3, '1');
  });
  t.end();
});
