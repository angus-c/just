var test = require('../util/test')(__filename);
var clamp = require('../../packages/number-clamp');

test('regular numbers are limited by range', function(t) {
  t.plan(4);
  var n = 5;
  t.equal(clamp(1, n, 12), 5);
  t.equal(clamp(1, n, 3), 3);
  t.equal(clamp(8, n, 9), 8);
  t.equal(clamp(0, n, 0), 0);
  t.end();
});

test('falsey values are treated as 0', function(t) {
  t.plan(4);
  t.equal(clamp(3, undefined, 8), 3);
  t.equal(clamp(3, null, 8), 3);
  t.equal(clamp(3, false, 8), 3);
  t.equal(clamp(3, 'hello', 8), 3); // NaN
  t.end();
});
