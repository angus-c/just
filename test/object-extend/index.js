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
  t.end();
});

test('shallow extend copies non-plain objects', function(t) {
  t.plan(12);
  var fn = function(a, b) {
    return a + b;
  };
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(src2, {c: fn}), {a: 3, b: 5, c: fn});
  t.deepEqual(src2, {a: 3, b: 5, c: fn});
  t.equal(src2.c(4, 2), 6);
  fn.x = 34;
  t.equal(src2.c.x, 34);

  var date = new Date(1510439803151);
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(src3, {c: date}), {a: 3, b: 5, c: date});
  t.deepEqual(src3, {a: 3, b: 5, c: date});
  t.equal(src3.c.getTime(), 1510439803151);
  date.x = 34;
  t.equal(src3.c.x, 34);

  var regex = /abc/;
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(src3, {c: regex}), {a: 3, b: 5, c: regex});
  t.deepEqual(src3, {a: 3, b: 5, c: regex});
  t.equal(src3.c.exec('ddabc').index, 2);
  regex.x = 34;
  t.equal(src3.c.x, 34);

  t.end();
});

test('deep extend merges child objects', function(t) {
  t.plan(2);
  var obj = {a: {b: 'c'}};
  var obj2 = {a: {c: 'd'}};
  t.deepEqual(extend(true, obj, obj2), {a: {b: 'c', c: 'd'}});
  t.deepEqual(obj, {a: {b: 'c', c: 'd'}});
  t.end();
});

test('deep extend clones child plain objects and arrays', function(t) {
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
  t.end();
});

test('deep extend does not clone child non-plain objects', function(t) {
  t.plan(12);
  var fn = function(a, b) {
    return a + b;
  };
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(true, src2, {c: fn}), {a: 3, b: 5, c: fn});
  t.deepEqual(src2, {a: 3, b: 5, c: fn});
  t.equal(src2.c(4, 2), 6);
  fn.x = 34;
  t.equal(src2.c.x, 34);

  var date = new Date(1510439803151);
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(true, src3, {c: date}), {a: 3, b: 5, c: date});
  t.deepEqual(src3, {a: 3, b: 5, c: date});
  t.equal(src3.c.getTime(), 1510439803151);
  date.x = 34;
  t.equal(src3.c.x, 34);

  var regex = /abc/;
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(true, src3, {c: regex}), {a: 3, b: 5, c: regex});
  t.deepEqual(src3, {a: 3, b: 5, c: regex});
  t.equal(src3.c.exec('ddabc').index, 2);
  regex.x = 34;
  t.equal(src3.c.x, 34);

  t.end();
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
  t.end();
});

test('extendee and extenders can be functions', function(t) {
  t.plan(4);
  var fn = function() {};
  var result = extend(fn, {a: 4});
  t.ok(typeof result == 'function');
  t.ok(result.a === 4);

  var src = {a: 3};
  var fn2 = function() {};
  t.deepEqual(extend(true, src, {b: fn2}), {a: 3, b: fn2});
  t.deepEqual(src, {a: 3, b: fn2});
  t.end();
});

test('extender can be any primitive', function(t) {
  t.plan(12);
  var src1 = {a: 4};
  t.deepEqual(extend(src1, null), {a: 4});
  t.deepEqual(src1, {a: 4});

  var src2 = {a: 3};
  t.deepEqual(extend(src2, undefined), {a: 3});
  t.deepEqual(src2, {a: 3});

  var src3 = {a: 4};
  t.deepEqual(extend(src3, 'hello'), {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});
  t.deepEqual(src3, {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});

  var src4 = {1: 9, a: 4};
  t.deepEqual(extend(src4, 'hello', 4), {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});
  t.deepEqual(src4, {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});

  var src5 = {a: 4};
  t.deepEqual(extend(src5, false), {a: 4});
  t.deepEqual(src5, {a: 4});

  var src6 = {a: 4};
  t.deepEqual(extend(src6, 3, true), {a: 4});
  t.deepEqual(src6, {a: 4});
  t.end();
});

test("extendee can't be a primitive", function(t) {
  t.plan(9);
  t.throws(function() {
    extend(null, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(undefined, {b: 4, c: 5});
  });
  t.throws(function() {
    extend('hello', {b: 4, c: 5});
  });
  t.throws(function() {
    extend(3, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, null, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(true, undefined, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(true, 'hello', {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, 3, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, false, {b: 4, c: 5});
  });
  t.end();
});
