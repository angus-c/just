var test = require('../util/test')(__filename);
var clone = require('../../packages/collection-clone');

test('copies entire tree', function(t) {
  t.plan(2);
  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  t.deepEqual(objClone, obj);

  var arr = [1, 2, ['a', 'b', {dd: [1, 2, 3]}]];
  var arrClone = clone(arr);
  t.deepEqual(arrClone, arr);
});

test('clones child plain objects and arrays', function(t) {
  t.plan(2);
  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  arr.push(4);
  subObj.bb = 2;
  t.deepEqual(obj, {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1, bb: 2}});
  t.deepEqual(objClone, {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1}});
});

test('clones Functions, Dates and RegExps', function(t) {
  t.plan(5);
  var date = new Date();
  var regexp = /a(b)c/gim;
  var obj = {b: date, c: regexp};
  var objClone = clone(obj);
  var objToString = Object.prototype.toString;
  t.equal(objToString.call(objClone.b), '[object Date]');
  t.equal(objToString.call(objClone.c), '[object RegExp]');
  objClone.b.setTime(date.getTime() + 87);
  t.equal(objClone.b.getTime() - date.getTime(), 87);
  objClone.c.compile(/a(c)/gi);
  t.equal(String(regexp), '/a(b)c/gim');
  t.equal(String(objClone.c), '/a(c)/gi');
});

test("doesn't clone functions", function(t) {
  t.plan(6);
  var fn = function(a, b) {
    return a + b;
  };
  t.ok(fn === clone(fn));
  var obj = {a: 3, b: 5, c: fn};
  fn.x = 22;
  var objClone = clone(obj);
  fn.x = 34;
  t.deepEqual(objClone, {a: 3, b: 5, c: fn});
  t.equal(objClone.c(2, 3), 5);
  t.equal(fn(2, 3), 5);
  t.equal(objClone.c.x, 34);
  t.equal(fn.x, 34);
});
