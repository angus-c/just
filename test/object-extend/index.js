var test = require('../util/test')(__filename);
var extend = require('../../packages/object-extend');

test('shallow extend merges properties', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend merges into new object', function(t) {
  t.plan(2);
  var src = {};
  t.deepEqual(extend(src, {a: 3, b: 5}, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend does not clone child objects', function(t) {
  t.plan(5);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(src2, {c: obj}), {a: 3, b: 5, c: {p: 4}});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 9}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  t.deepEqual(extend(src1, {c: arrOuter}), {a: 3, b: 5, c: ['a', 'b', [1, 2, 3]]});
  t.equal(arrOuter, src1.c);
  t.equal(arrInner, src1.c[2]);
});

test('deep extend merges child objects', function(t) {
  t.plan(2);
  var obj = {a: {b: 'c'}};
  var obj2 = {a: {c: 'd'}};
  t.deepEqual(extend(true, obj, obj2), {a: {b: 'c', c: 'd'}});
  t.deepEqual(obj, {a: {b: 'c', c: 'd'}});
});

test('deep extend clones child objects', function(t) {
  t.plan(5);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(true, src2, {c: obj}), {a: 3, b: 5, c: {p: 4}});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 4}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  t.deepEqual(extend(true, src1, {c: arrOuter}), {a: 3, b: 5, c: ['a', 'b', [1, 2, 3]]});
  t.notEqual(arrOuter, src1.c);
  t.notEqual(arrInner, src1.c[2]);
});

test('null values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: null, c: null}), {a: null, b: 5, c: null});
  t.deepEqual(src, {a: null, b: 5, c: null});
  t.end();
});

test('explicitly undefined values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: undefined, c: undefined}), {a: undefined, b: 5, c: undefined});
  t.deepEqual(src, {a: undefined, b: 5, c: undefined});
  t.end();
});

test('when no extenders, extendee is returned unmutated', function(t) {
  t.plan(4);
  var src = {a: 3, b: 5};
  var srcRef = src;
  t.deepEqual(src, extend(src));
  t.equal(srcRef, src);
  t.deepEqual(src, extend(true, src));
  t.equal(srcRef, src);
});

test('extendee and extenders must be objects', function(t) {
  t.plan(5);
  t.throws(function() {
    extend(3, {a: 4, b: 5});
  });
  t.throws(function() {
    extend({a: 4, b: 5}, 3);
  });
  t.throws(function() {
    extend({a: 4, b: 5}, true);
  });
  t.throws(function() {
    extend({a: 4, b: 5}, {b: 4, c: 5}, 'c');
  });
  t.throws(function() {
    extend({a: 4, b: 5}, null, {b: 4, c: 5});
  });
  t.end();
});
