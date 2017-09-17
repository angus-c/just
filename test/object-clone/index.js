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

test("doesn't share children with original", function(t) {
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
