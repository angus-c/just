var test = require('../util/test')(__filename);
var compose = require('../../packages/function-compose');
var compare = require('../../packages/collection-compare');

test('composes two or more functions', function(t) {
  t.plan(3);
  var splitBy2s = compose(String, function(str) {
    return str.split(2);
  });
  t.ok(compare(splitBy2s(52423), ['5', '4', '3']));
  var sqRootBiggest = compose(Math.max, Math.sqrt, Math.round);
  t.equal(sqRootBiggest(10, 5), 3);
  t.equal(sqRootBiggest(7, 0, 16), 4);
  t.end();
});

test('when composing only one function, returns that function', function(t) {
  t.plan(2);
  t.equal(compose(Math.sqrt)(19), Math.sqrt(19));
  t.equal(compose(Math.max)(4, 7, 99), Math.max(4, 7, 99));
  t.end();
});

test('when composing zero functions, throws error', function(t) {
  t.plan(1);
  t.throws(compose, Error);
  t.end();
});
