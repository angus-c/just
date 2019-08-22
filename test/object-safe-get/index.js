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

test('returns 3rd param for non-existing properties, using dot-notation arg', function(t) {
  t.plan(6);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(get(obj, 'b.bb', 888), 888));
  t.ok(compare(get(obj, 'a.bb', 888), 888));
  t.ok(compare(get(obj, 'b.bb.bbb', 888), 888));
  t.ok(compare(get(obj.b, 'bb.bbb', 888), 888));
  t.ok(compare(get(obj, 'c.cc', 888), 888));
  t.ok(compare(get(obj, 'd.dd.ddd', 888), 888));
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

test('returns 3rd param for non-existing properties, using array arg', function(t) {
  t.plan(8);
  var obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
  t.ok(compare(get(obj, ['b', 'bb'], 888), 888));
  t.ok(compare(get(obj, ['a', 'bb'], 888), 888));
  t.ok(compare(get(obj, ['b', 'bb', 'bbb'], 888), 888));
  t.ok(compare(get(obj.b, ['bb', 'bbb'], 888), 888));
  t.ok(compare(get(obj, ['c', 'cc'], 888), 888));
  t.ok(compare(get(obj, ['d', 'dd', 'ddd'], 888), 888));
  var arr = ['b', 'bb', 'bbb'];
  t.ok(compare(get(obj, arr, 888), 888));
  t.ok(compare(arr, ['b', 'bb', 'bbb'])); // array arg preserved

  t.end();
});

test('returns undefined for falsey property names using dot notation', function(t) {
  t.plan(5);
  var obj = {a: {aa: {aaa: 2}}, b: {}};
  t.ok(compare(get(obj, 'a.'), undefined));
  t.ok(compare(get(obj, 'a.aa.aaa.'), undefined));
  t.ok(compare(get(obj, 'b.'), undefined));
  t.ok(compare(get(obj, 'b..b'), undefined));
  t.ok(compare(get(obj, 'b...b'), undefined));
  t.end();
});

test('returns 3rd param for falsey property names using dot notation', function(t) {
  t.plan(3);
  var obj = {a: {aa: {aaa: 2}}, b: {}};
  t.ok(compare(get(obj, 'a.', 888), 888));
  t.ok(compare(get(obj, 'a.aa.aaa.', 888), 888));
  t.ok(compare(get(obj, 'b.', 888), 888));
  t.end();
});

test('returns undefined for falsey property names using array arg', function(t) {
  t.plan(5);
  var obj = {a: {aa: {aaa: 2}}, b: {'': {'': 3}}};
  t.ok(compare(get(obj, ['a', false]), undefined));
  t.ok(compare(get(obj, ['a', 'aa', 'aaa', null]), undefined));
  t.ok(compare(get(obj, ['b', undefined]), undefined));
  var arr = ['a', 'aa', 'aaa', null];
  t.ok(compare(get(obj, arr), undefined));
  t.ok(compare(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  t.end();
});

test('returns 3rd param for falsey property names using array arg', function(t) {
  t.plan(5);
  var obj = {a: {aa: {aaa: 2}}, b: {'': {'': 3}}};
  t.ok(compare(get(obj, ['a', false], 888), 888));
  t.ok(compare(get(obj, ['a', 'aa', 'aaa', null], 888), 888));
  t.ok(compare(get(obj, ['b', undefined], 888), 888));
  var arr = ['a', 'aa', 'aaa', null];
  t.ok(compare(get(obj, arr, 888), 888));
  t.ok(compare(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  t.end();
});

test('follows empty keys using array arg', function(t) {
  t.plan(2);
  var obj = {b: {'': {'': 3}}};
  t.ok(compare(get(obj, ['b', '']), {'': 3}));
  t.ok(compare(get(obj, ['b', '', '']), 3));
  t.end();
});

test('returns undefined if first argument is a falsey value', function(t) {
  t.plan(2);
  t.ok(compare(get(null, 'a'), undefined));
  t.ok(compare(get(undefined, 'a'), undefined));
  t.end();
});

test('returns 3rd argument if first argument is a falsey value', function(t) {
  t.plan(2);
  t.ok(compare(get(null, 'a', 888), 888));
  t.ok(compare(get(undefined, 'a', 888), 888));
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
