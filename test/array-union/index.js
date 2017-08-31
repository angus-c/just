var test = require('../util/test')(__filename);
var union = require('../../packages/array-union');

test("union of intersecting arrays doesn't include dupliccates", function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [3, 4, 5, 6, 7];
  t.deepEqual(union(arr1, arr2), [1, 2, 3, 4, 5, 6, 7]);
  t.end();
});

test('union of non-intersecting arrays return all members', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.deepEqual(union(arr1, arr2), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  t.end();
});

test('does not mutate', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.notEqual(union(arr1, arr2), arr1);
  t.end();
});
