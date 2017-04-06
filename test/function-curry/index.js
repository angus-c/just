var test = require('tape');
var curry = require('../../packages/function-curry');

test('binds curried arguments to supplied arguments', function (t) {
  t.plan(4);
  function converter(ratio, input) {
    return (input * ratio).toFixed(1);
  }
  var milesToKm = curry(converter, 1.62);
  t.equal(milesToKm(), 'NaN');
  t.equal(milesToKm(35), '56.7');
  t.equal(milesToKm(10), '16.2');
  t.equal(milesToKm(10, 35), '16.2');
  t.end();
});

test('returns original function if zero currying args are passed', function (t) {
  t.plan(3);
  function converter(ratio, input) {
    return (input * ratio).toFixed(1);
  }
  var milesToKm = curry(converter);
  t.equal(converter, milesToKm);
  t.equal(converter(1.62, 35), '56.7');
  t.equal(milesToKm(1.62, 35), '56.7');
  t.end();
});

test('executes in the correct context', function (t) {
  t.plan(2);
  function converter(ratio, input) {
    return (input * ratio).toFixed(this.dps);
  }
  var milesToKm = curry(converter, 1.62);
  t.equal(milesToKm.call({dps: 0}, 35), '57');
  t.equal(milesToKm.call({dps: 2}, 35), '56.70');
  t.end();
});

test('converts n-ary function to a sequence of nested unary functions', function (t) {
  t.plan(2);
  function addThree(x, y, z) {
    return x + y + z;
  }
  var addTwoTo2 = curry(addThree, 2);
  t.equal(typeof addTwoTo2(3), 'function');
  t.equal(addTwoTo2(5)(8), 16);
  t.end();
})
