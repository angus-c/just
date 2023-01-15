var test = require('../util/test')(__filename);
var modulo = require('../../packages/number-modulo');

test('positive numbers do simple remainder', function(t) {
  t.plan(3);
  t.equal(modulo(7, 5), 2);
  t.equal(modulo(17, 23), 17);
  t.equal(modulo(5.8, 3.4), 2.4);
  t.end();
});

test('zero divisor returns number', function(t) {
  t.plan(2);
  t.equal(modulo(7, 0), 7);
  t.equal(modulo(-17, 0), -17);
  t.end();
});

test('negative numbers recursively add divisor until >= number', function(t) {
  t.plan(3);
  t.equal(modulo(-7, 5), 3);
  t.equal(modulo(-2, 15), 13);
  t.equal(modulo(-5.8, 3.4), 1);
  t.end();
});

test('negative divisor returns NaN', function(t) {
  t.plan(2);
  t.ok(isNaN(modulo(12, -1)));
  t.ok(isNaN(modulo(-3, -8)));
  t.end();
});

test('non-numeric number or divisor returns NaN', function(t) {
  t.plan(3);
  t.ok(isNaN(modulo(12, 'apple')));
  t.ok(isNaN(modulo('bee', 9)));
  t.ok(isNaN(modulo(null, undefined)));
  t.end();
});
