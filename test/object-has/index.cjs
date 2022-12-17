var test = require('../util/test')(__filename);
var has = require('../../packages/object-has');
var compare = require('../../packages/collection-compare');

test('returns existence of properties using dot-notation arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: 0};
  t.ok(compare(has(obj, 'a'), true));
  t.ok(compare(has(obj, 'a.aa'), true));
  t.ok(compare(has(obj, 'a.aa.aaa'), true));
  t.ok(compare(has(obj, 'b'), true));
  t.ok(compare(has(obj.a, 'aa'), true));
  t.ok(compare(has(obj.a.aa, 'aaa'), true));
  t.end();
});

test('returns existence of properties using array arg', function(t) {
  t.plan(9);
  var obj = {a: {aa: {aaa: 2}}, b: null};
  t.ok(compare(has(obj, ['a']), true));
  t.ok(compare(has(obj, ['a', 'aa']), true));
  t.ok(compare(has(obj, ['a', 'aa', 'aaa']), true));
  t.ok(compare(has(obj, ['b']), true));
  t.ok(compare(has(obj.a, ['aa']), true));
  t.ok(compare(has(obj.a.aa, ['aaa']), true));
  var arr = ['a', 'aa', 'aaa'];
  t.ok(compare(has(obj, arr), true));
  t.ok(compare(arr, ['a', 'aa', 'aaa'])); // array arg preserved
  t.ok(compare(obj, {a: {aa: {aaa: 2}}, b: null})); // obj arg preserved
  t.end();
});

test('returns false for non-existing properties, using dot-notation arg', function(t) {
  t.plan(7);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(has(obj, 'b.bb'), false));
  t.ok(compare(has(obj, 'a.bb'), false));
  t.ok(compare(has(obj, 'a.aa.aaa.aaaa'), false));
  t.ok(compare(has(obj, 'b.bb.bbb'), false));
  t.ok(compare(has(obj.b, 'bb.bbb'), false));
  t.ok(compare(has(obj, 'c.cc'), false));
  t.ok(compare(has(obj, 'd.dd.ddd'), false));
  t.end();
});

test('returns false for non-existing properties, using array arg', function(t) {
  t.plan(9);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(has(obj, ['b', 'bb']), false));
  t.ok(compare(has(obj, ['a', 'bb']), false));
  t.ok(compare(has(obj, ['b', 'bb', 'bbb']), false));
  t.ok(compare(has(obj.b, ['bb', 'bbb']), false));
  t.ok(compare(has(obj, ['c', 'cc']), false));
  t.ok(compare(has(obj, ['d', 'dd', 'ddd']), false));
  var arr = ['b', 'bb', 'bbb'];
  t.ok(compare(has(obj, arr), false));
  t.ok(compare(arr, ['b', 'bb', 'bbb'])); // array arg preserved
  t.ok(compare(obj, {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0})); // obj arg preserved

  t.end();
});

test('returns false for falsey property names using dot notation', function(t) {
  t.plan(5);
  var obj = {a: {aa: {aaa: 2}}, b: {}};
  t.ok(compare(has(obj, 'a.'), false));
  t.ok(compare(has(obj, 'a.aa.aaa.'), false));
  t.ok(compare(has(obj, 'b.'), false));
  t.ok(compare(has(obj, 'b..b'), false));
  t.ok(compare(has(obj, 'b...b'), false));
  t.end();
});

test('returns false for falsey property names using array arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: {'': {'': 3}}};
  t.ok(compare(has(obj, ['a', false]), false));
  t.ok(compare(has(obj, ['a', 'aa', 'aaa', null]), false));
  t.ok(compare(has(obj, ['b', false]), false));
  var arr = ['a', 'aa', 'aaa', null];
  t.ok(compare(has(obj, arr), false));
  t.ok(compare(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  t.ok(compare(obj, {a: {aa: {aaa: 2}}, b: {'': {'': 3}}})); // obj arg preserved
  t.end();
});

test('follows empty keys using array arg', function(t) {
  t.plan(2);
  var obj = {b: {'': {'': 3}}};
  t.ok(compare(has(obj, ['b', '']), true));
  t.ok(compare(has(obj, ['b', '', '']), true));
  t.end();
});

test('returns false if first argument is a falsey value', function(t) {
  t.plan(2);
  t.ok(compare(has(null, 'a'), false));
  t.ok(compare(has(undefined, 'a'), false));
  t.end();
});

/* eslint-disable no-undef*/
if (typeof Symbol === 'function') {
  test('works with symbols', function(t) {
    t.plan(1);
    var obj = {a: {}};
    var sym = Symbol();
    obj.a[sym] = 4;
    t.ok(compare(has(obj.a, sym), true));
    t.end();
  });
}
