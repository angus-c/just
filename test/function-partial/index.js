var test = require('tape');
var partial = require('../../packages/function-partial');

// var _ = global.___;

test('binds to supplied arguments placeholders', function (t) {
  t.plan(2);
  var cubeRoot = partial(Math.pow, undefined, 1 / 3);
  t.equal(cubeRoot(10).toFixed(1), '2.2');
  t.equal(cubeRoot(35).toFixed(1), '3.3');
  t.end();
});

test('surplus supplied arguments ignored', function (t) {
  function max() {
    return Math.max.apply(null, arguments);
  }
  var atLeast4 = partial(max, undefined, 4);
  t.equal(atLeast4(7), 7);
  t.equal(atLeast4(3, 9), 4);
  t.end();
});

test('if no placeholder args passed, supplied args ignored', function (t) {
  function max() {
    return Math.max.apply(null, arguments);
  }
  var badPartial = partial(max, 4);
  t.equal(badPartial(3), 4);
  t.equal(badPartial(4), 4);
  t.equal(badPartial(5), 4);
  t.equal(badPartial(), 4);
  t.end();
});

test('executes in the correct context', function (t) {
  t.plan(2);
  function nthRoot(input, n) {
    return Math.pow(input, 1 / n).toFixed(this.dps);
  }
  var fourthRoot = partial(nthRoot, undefined, 4);
  t.equal(fourthRoot.call({dps: 0}, 4345), '8');
  t.equal(fourthRoot.call({dps: 2}, 4345), '8.12');
  t.end();
});
