var test = require('../util/test')(__filename);
var flip = require('../../packages/object-flip');

test('flip primitive values', function(t) {
  t.plan(3);
  t.deepEqual(flip({a: 'x', b: 'y', c: 'z'}), {x: 'a', y: 'b', z: 'c'});
  t.deepEqual(flip({a: 1, b: 2, c: 3}), {'1': 'a', '2': 'b', '3': 'c'});
  t.deepEqual(flip({a: false, b: true}), {false: 'a', true: 'b'});
  t.end();
});

test('flip falsey values', function(t) {
  t.plan(1);
  t.deepEqual(flip({a: null, b: undefined}), {null: 'a', undefined: 'b'});
  t.end();
});

test('flip complex values', function(t) {
  t.plan(1);
  t.deepEqual(flip({a: {x: 1}, b: [1, 2]}), {
    '[object Object]': 'a',
    '1,2': 'b',
  });
  t.end();
});

test('preserves __proto__ as an own result key', function(t) {
  t.plan(8);
  var input = {a: '__proto__', b: 'constructor', c: 'hasOwnProperty'};
  var result = flip(input);
  t.deepEqual(Object.keys(result), ['__proto__', 'constructor', 'hasOwnProperty']);
  t.equal(result.__proto__, 'a');
  t.equal(result.constructor, 'b');
  t.equal(result.hasOwnProperty, 'c');
  t.equal(Object.getPrototypeOf(result), Object.prototype);
  t.deepEqual(Object.getOwnPropertyDescriptor(result, '__proto__'), {
    value: 'a', enumerable: true, configurable: true, writable: true,
  });
  result.__proto__ = 'changed';
  t.equal(result.__proto__, 'changed');
  t.equal(delete result.__proto__, true);
  t.end();
});

test('keeps the last source key for duplicate __proto__ values', function(t) {
  t.plan(2);
  var result = flip({a: '__proto__', b: '__proto__'});
  t.deepEqual(Object.keys(result), ['__proto__']);
  t.equal(result.__proto__, 'b');
  t.end();
});
