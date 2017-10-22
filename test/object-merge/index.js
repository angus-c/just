var test = require('../util/test')(__filename);
var merge = require('../../packages/object-merge');

test('shallow merge merges properties', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(merge(src, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow merge merges into new object', function(t) {
  t.plan(2);
  var src = {};
  t.deepEqual(merge(src, {a: 3, b: 5}, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow merge does not clone child objects', function(t) {
  t.plan(5);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  t.deepEqual(merge(src2, {c: obj}), {a: 3, b: 5, c: {p: 4}});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 9}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  t.deepEqual(merge(src1, {c: arrOuter}), {a: 3, b: 5, c: ['a', 'b', [1, 2, 3]]});
  t.equal(arrOuter, src1.c);
  t.equal(arrInner, src1.c[2]);
});

test('null values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(merge(src, {a: null, c: null}), {a: null, b: 5, c: null});
  t.deepEqual(src, {a: null, b: 5, c: null});
  t.end();
});

test('explicitly undefined values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(merge(src, {a: undefined, c: undefined}), {a: undefined, b: 5, c: undefined});
  t.deepEqual(src, {a: undefined, b: 5, c: undefined});
  t.end();
});

test('when no extendee, extenders is returned unmutated', function(t) {
  t.plan(3);
  var src = {a: 3, b: 5};
  var srcRef = src;
  t.deepEqual(src, merge(src));
  t.equal(srcRef, src);
  t.equal(srcRef, src);
  t.end();
});

test('extendee and extenders can be functions', function(t) {
  t.plan(2);
  var fn = function() {};
  var result = merge(fn, {a: 4});
  t.ok(typeof result == 'function');
  t.ok(result.a === 4);
  t.end();
});

test('extendee and extenders must be objects', function(t) {
  t.plan(4);
  t.throws(function() {
    merge(3, {a: 4, b: 5});
  });
  t.throws(function() {
    merge({a: 4, b: 5}, 3);
  });
  t.throws(function() {
    merge({a: 4, b: 5}, true);
  });
  t.throws(function() {
    merge({a: 4, b: 5}, {b: 4, c: 5}, 'c');
  });
  t.end();
});
