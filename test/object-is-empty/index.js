/* global Set, Map */

var test = require('../util/test')(__filename);
var isEmpty = require('../../packages/object-is-empty');

test('empty object, array, map or set', function(t) {
  t.plan(4);
  t.ok(isEmpty({}));
  t.ok(isEmpty([]));
  t.ok(typeof Set == 'function' ? isEmpty(new Set()) : true);
  t.ok(typeof Map == 'function' ? isEmpty(new Map()) : true);
  t.end();
});

test('null or undefined', function(t) {
  t.plan(2);
  t.ok(isEmpty(null));
  t.ok(isEmpty(undefined));
  t.end();
});

test.only('non-empty object, array, map or set', function(t) {
  t.plan(4);
  t.notOk(isEmpty({a: 3, b: 5}));
  t.notOk(isEmpty([1, 2]));
  t.notOk(typeof Set == 'function' ? isEmpty(new Set([1, 2, 2])) : true);
  t.notOk(typeof Map == 'function' ? isEmpty(new Map().set('a', 2)) : true);
  t.end();
});
