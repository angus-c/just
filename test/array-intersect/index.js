var test = require('../util/test')(__filename);
var intersect = require('../../packages/array-intersect');

test('intersecting arrays return intersect', function(t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [3, 4, 5, 6, 7];
  t.deepEqual(intersect(arr1, arr2), [3, 4, 5]);
  t.end();
});

test('non intersecting arrays return empty array', function(t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.deepEqual(intersect(arr1, arr2), []);
  t.end();
});

test("throws if first two arguments aren't arrays", function(t) {
  t.plan(8);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.throws(function() {
    intersect(undefined, arr2);
  });
  t.throws(function() {
    intersect(null, arr2);
  });
  t.throws(function() {
    intersect({}, arr2);
  });
  t.throws(function() {
    intersect('a', arr2);
  });
  t.throws(function() {
    intersect(arr1, undefined);
  });
  t.throws(function() {
    intersect(arr1, null);
  });
  t.throws(function() {
    intersect(arr1, {});
  });
  t.throws(function() {
    intersect(arr1, 'a');
  });
  t.end();
});
