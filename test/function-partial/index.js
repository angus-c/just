var test = require('../util/test')(__filename);
var partial = require('../../packages/function-partial');

test('binds to supplied arguments placeholders', function(t) {
  t.plan(2);
  var cubeRoot = partial(Math.pow, undefined, 1 / 3);
  t.equal(cubeRoot(10).toFixed(1), '2.2');
  t.equal(cubeRoot(35).toFixed(1), '3.3');
});

test('works without placeholders', function(t) {
  t.plan(3);
  function max() {
    return Math.max.apply(null, arguments);
  }
  var atLeast4 = partial(max, 4);
  t.equal(atLeast4(3), 4);
  t.equal(atLeast4(4), 4);
  t.equal(atLeast4(5), 5);
  t.end();
});

test('works when number of runtime arguments exceeds number of placehoders', function(
  t
) {
  t.plan(3);
  function max() {
    return Math.max.apply(null, arguments);
  }
  var atLeast4 = partial(max, 4, undefined);
  t.equal(atLeast4(3, 5), 5);
  t.equal(atLeast4(3, 2), 4);
  t.equal(atLeast4(1, 2, 3, 4, 5), 5);
  t.end();
});

test('works without preset values', function(t) {
  t.plan(3);
  function max() {
    return Math.max.apply(null, arguments);
  }
  var noMinimum = partial(max);
  t.equal(noMinimum(-3), -3);
  t.equal(noMinimum(0), 0);
  t.equal(noMinimum(-1, 5), 5);
  t.end();
});

test('executes in the correct context', function(t) {
  t.plan(2);
  function nthRoot(input, n) {
    return Math.pow(input, 1 / n).toFixed(this.dps);
  }
  var fourthRoot = partial(nthRoot, undefined, 4);
  t.equal(fourthRoot.call({dps: 0}, 4345), '8');
  t.equal(fourthRoot.call({dps: 2}, 4345), '8.12');
  t.end();
});
