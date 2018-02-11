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

test("doesn't clone child non-plain objects", function(t) {
  t.plan(7);
  var fn = function(a, b) {
    return a + b;
  };
  var date = new Date(1510439803151);
  var regex = /abc/;
  var obj = {a: 3, b: 5, c: fn, d: date, e: regex};
  var objClone = clone(obj);
  fn.x = 34;
  date.x = 34;
  regex.x = 34;
  t.deepEqual(objClone, {a: 3, b: 5, c: fn, d: date, e: regex});
  t.equal(objClone.c(2, 3), 5);
  t.equal(objClone.d.getTime(), 1510439803151);
  t.equal(objClone.e.exec('ddabc').index, 2);
  t.equal(objClone.c.x, 34);
  t.equal(objClone.d.x, 34);
  t.equal(objClone.e.x, 34);
});
