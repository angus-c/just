var test = require('tape');
var intersect = require('../../array-intersect');

test('intersecting arrays return intersect', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [3, 4, 5, 6, 7];
  t.deepEqual(intersect(arr1, arr2), [3, 4, 5]);
  t.end();
});

test('non intersecting arrays return empty array', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.deepEqual(intersect(arr1, arr2), []);
  t.end();
});
