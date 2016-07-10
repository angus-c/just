var test = require('tape');
var intersect = require('../../packages/array-remove');

test('returns elements unique to first array', function (t) {
  t.plan(4);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = [1, 3, 6];
  t.deepEqual(intersect(arr1, arr2), [2, 4, 5]);
  var arr1 = ['a', 'b', 'c', 'd'];
  var arr2 = ['c', 'd'];
  t.deepEqual(intersect(arr1, arr2), ['a', 'b']);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = [];
  t.deepEqual(intersect(arr1, arr2), [1, 2, 3, 4, 5, 6]);
  var arr1 = [];
  var arr2 = [1, 2, 3, 4, 5, 6];
  t.deepEqual(intersect(arr1, arr2), []);
  t.end();
});
