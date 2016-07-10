var test = require('tape');
var extend = require('../../packages/object-extend');

test('shallow extend merges properties', function (t) {
  t.plan(1);
  var src = {a: 3, b: 5};
  extend(src, {a: 4, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend merges into new object', function (t) {
  t.plan(1);
  var src = {};
  extend(src, {a: 3, b: 5}, {a: 4, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend does not clone child objects', function (t) {
  t.plan(3);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  extend(src2, {c: obj});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 9}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  extend(src1, {c: arrOuter});
  t.equal(arrOuter, src1.c);
  t.equal(arrInner, src1.c[2]);
});

test('deep extend clones child objects', function (t) {
  t.plan(3);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  extend(true, src2, {c: obj});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 4}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  extend(true, src1, {c: arrOuter});
  t.notEqual(arrOuter, src1.c);
  t.notEqual(arrInner, src1.c[2]);
});

test('null values are copied', function (t) {
  t.plan(1);
  var src = {a: 3, b: 5};
  extend(src, {a: null, c: null});
  t.deepEqual(src, {a: null, b: 5, c: null});
  t.end();
});

test('explcitly undefined values are copied', function (t) {
  t.plan(1);
  var src = {a: 3, b: 5};
  extend(src, {a: undefined, c: undefined});
  t.deepEqual(src, {a: undefined, b: 5, c: undefined});
  t.end();
});
