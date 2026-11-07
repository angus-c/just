/* global Set, Map, Symbol */

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

test('non-empty object, array, map or set', function(t) {
  t.plan(7);
  t.notOk(isEmpty({a: 3, b: 5}));
  t.notOk(isEmpty({[Symbol('a')]: 'some-value'}));
  t.notOk(isEmpty([1, 2]));
  t.notOk(isEmpty(['a', 'b']));
  t.notOk(isEmpty(new Array(4)));
  t.notOk(typeof Set == 'function' ? isEmpty(new Set([1, 2, 2])) : true);
  t.notOk(typeof Map == 'function' ? isEmpty(new Map().set('a', 2)) : true);
  t.end();
});

test('null or undefined', function(t) {
  t.plan(2);
  t.ok(isEmpty(null));
  t.ok(isEmpty(undefined));
  t.end();
});

test('other primitives', function(t) {
  t.plan(6);
  t.ok(isEmpty(true));
  t.ok(isEmpty(false));
  t.notOk(isEmpty('hello'));
  t.ok(isEmpty(''));
  t.ok(isEmpty(0));
  t.ok(isEmpty(35));
  t.end();
});

test('other object types', function(t) {
  t.plan(11);
  t.ok(isEmpty(/^abc$/));
  t.ok(isEmpty(typeof Symbol == 'function' ? Symbol('abc') : true));
  t.ok(isEmpty(typeof Symbol == 'function' ? Symbol('') : true));
  t.ok(isEmpty(new String('')));
  t.notOk(isEmpty(new String('abc')));
  t.ok(isEmpty(new Boolean(false)));
  t.ok(isEmpty(new Boolean(true)));
  t.ok(isEmpty(''));
  t.notOk(isEmpty('abc'));
  t.ok(isEmpty(0));
  t.ok(isEmpty(35));
  t.end();
});

test('plain objects ignore non-enumerable symbol keys', function(t) {
  t.plan(8);
  var hidden = Symbol('hidden');
  var visible = Symbol('visible');
  var obj = {};
  Object.defineProperty(obj, hidden, {value: 1});
  t.ok(isEmpty(obj));
  Object.defineProperty(obj, visible, {value: 2, enumerable: true});
  t.notOk(isEmpty(obj));

  var nullProto = Object.create(null);
  Object.defineProperty(nullProto, hidden, {value: 1});
  t.ok(isEmpty(nullProto));
  nullProto.a = 2;
  t.notOk(isEmpty(nullProto));

  var shadowed = {};
  Object.defineProperty(shadowed, 'propertyIsEnumerable', {value: null});
  Object.defineProperty(shadowed, hidden, {value: 1});
  t.ok(isEmpty(shadowed));

  var inherited = Object.create({[visible]: 2});
  Object.defineProperty(inherited, hidden, {value: 1});
  t.ok(isEmpty(inherited));

  var nonEnumString = {};
  Object.defineProperty(nonEnumString, 'hidden', {value: 1});
  t.ok(isEmpty(nonEnumString));
  var frozen = Object.freeze(Object.defineProperty({}, hidden, {value: 1}));
  t.ok(isEmpty(frozen));
  t.end();
});
