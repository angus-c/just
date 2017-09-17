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
