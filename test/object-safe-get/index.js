var test = require('../util/test')(__filename);
var get = require('../../packages/object-safe-get');
var compare = require('../../packages/collection-compare');

test('returns existing properties using dot-notation arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: 0};
  t.ok(compare(get(obj, 'a'), {aa: {aaa: 2}}));
  t.ok(compare(get(obj, 'a.aa'), {aaa: 2}));
  t.ok(compare(get(obj, 'a.aa.aaa'), 2));
  t.ok(compare(get(obj, 'b'), 0));
  t.ok(compare(get(obj.a, 'aa'), {aaa: 2}));
  t.ok(compare(get(obj.a.aa, 'aaa'), 2));
  t.end();
});

test('returns existing properties using array arg', function(t) {
  t.plan(8);
  var obj = {a: {aa: {aaa: 2}}, b: null};
  t.ok(compare(get(obj, ['a']), {aa: {aaa: 2}}));
  t.ok(compare(get(obj, ['a', 'aa']), {aaa: 2}));
  t.ok(compare(get(obj, ['a', 'aa', 'aaa']), 2));
  t.ok(compare(get(obj, ['b']), null));
  t.ok(compare(get(obj.a, ['aa']), {aaa: 2}));
  t.ok(compare(get(obj.a.aa, ['aaa']), 2));
  var arr = ['a', 'aa', 'aaa'];
  t.ok(compare(get(obj, arr), 2));
  t.ok(compare(arr, ['a', 'aa', 'aaa'])); // array arg preserved
  t.end();
});

test('returns undefined for non-existing properties, using dot-notation arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(get(obj, 'b.bb'), undefined));
  t.ok(compare(get(obj, 'a.bb'), undefined));
  t.ok(compare(get(obj, 'b.bb.bbb'), undefined));
  t.ok(compare(get(obj.b, 'bb.bbb'), undefined));
  t.ok(compare(get(obj, 'c.cc'), undefined));
  t.ok(compare(get(obj, 'd.dd.ddd'), undefined));
  t.end();
});

test('returns undefined for non-existing properties, using array arg', function(t) {
  t.plan(8);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(get(obj, ['b', 'bb']), undefined));
  t.ok(compare(get(obj, ['a', 'bb']), undefined));
  t.ok(compare(get(obj, ['b', 'bb', 'bbb']), undefined));
  t.ok(compare(get(obj.b, ['bb', 'bbb']), undefined));
  t.ok(compare(get(obj, ['c', 'cc']), undefined));
  t.ok(compare(get(obj, ['d', 'dd', 'ddd']), undefined));
  var arr = ['b', 'bb', 'bbb'];
  t.ok(compare(get(obj, arr), undefined));
  t.ok(compare(arr, ['b', 'bb', 'bbb'])); // array arg preserved

  t.end();
});

test('returns undefined for falsey property names using dot notation', function(t) {
  t.plan(4);
  var obj = {a: {aa: {aaa: 2}}, b: {}};
  t.ok(compare(get(obj, 'a, ""', undefined)));
  t.ok(compare(get(obj, 'a, aa, aaa, ""', undefined)));
  t.ok(compare(get(obj, 'b, ""', undefined)));
  t.ok(compare(get(obj, 'b, ""'), undefined));
  t.end();
});

test('returns undefined for falsey property names using array arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: {}};
  t.ok(compare(get(obj, ['a', false]), undefined));
  t.ok(compare(get(obj, ['a', 'aa', 'aaa', null]), undefined));
  t.ok(compare(get(obj, ['b', undefined]), undefined));
  t.ok(compare(get(obj, ['b', '']), undefined));
  var arr = ['a', 'aa', 'aaa', null];
  t.ok(compare(get(obj, arr), undefined));
  t.ok(compare(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  t.end();
});

test('returns first argument if it is a falsey value', function(t) {
  t.plan(2);
  t.ok(compare(get(null, 'a'), null));
  t.ok(compare(get(undefined, 'a'), undefined));
  t.end();
});

/* eslint-disable no-undef*/
if (typeof Symbol === 'function') {
  test('works with symbols', function(t) {
    t.plan(1);
    var obj = {a: {}};
    var sym = Symbol();
    obj.a[sym] = 4;
    t.ok(compare(get(obj.a, sym), 4));
    t.end();
  });
}
