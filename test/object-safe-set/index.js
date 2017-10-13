var test = require('../util/test')(__filename);
var set = require('../../packages/object-safe-set');
var compare = require('../../packages/collection-compare');

test('sets existing property using dot-notation arg', function(t) {
  t.plan(4);
  var obj1 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj1, 'a.aa.aaa', 3), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 3}}}));
  var obj2 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj2, 'a.aa', {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});

test('sets existing property using array arg', function(t) {
  t.plan(4);
  var obj1 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj1, ['a', 'aa', 'aaa'], 3), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 3}}}));
  var obj2 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj2, ['a', 'aa'], {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});

test("doesn't set non-existent properties, using dot-notation arg", function(t) {
  t.plan(2);
  var obj1 = {};
  t.isEqual(set(obj1, 'a.aa.aaa', 4), false);
  var obj2 = {};
  t.isEqual(set(obj2, 'a.aa', {bbb: 7}), false);
  t.end();
});

test("doesn't set non-existent properties, using dot-notation arg", function(t) {
  t.plan(2);
  var obj1 = {};
  t.isEqual(set(obj1, ['a', 'aa', 'aaa'], 4), false);
  var obj2 = {};
  t.isEqual(set(obj2, ['a', 'aa'], {bbb: 7}), false);
  t.end();
});

/* eslint-disable no-undef*/
if (typeof Symbol === 'function') {
  test('supports symbol prop', function(t) {
    t.plan(2);
    var obj1 = {a: {}};
    var sym = Symbol();
    t.isEqual(set(obj1.a, sym, 7), true);
    t.ok(obj1.a[sym] === 7);
    t.end();
  });
}
