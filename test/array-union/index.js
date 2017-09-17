var test = require('../util/test')(__filename);
var union = require('../../packages/array-union');

test("union of intersecting arrays doesn't include dupliccates", function(t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [3, 4, 5, 6, 7];
  t.deepEqual(union(arr1, arr2), [1, 2, 3, 4, 5, 6, 7]);
  t.end();
});

test('union of non-intersecting arrays return all members', function(t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.deepEqual(union(arr1, arr2), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  t.end();
});

test('does not mutate', function(t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.notEqual(union(arr1, arr2), arr1);
  t.end();
});

test("throws if first two arguments aren't arrays", function(t) {
  t.plan(8);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.throws(function() {
    union(undefined, arr2);
  });
  t.throws(function() {
    union(null, arr2);
  });
  t.throws(function() {
    union({}, arr2);
  });
  t.throws(function() {
    union('a', arr2);
  });
  t.throws(function() {
    union(arr1, undefined);
  });
  t.throws(function() {
    union(arr1, null);
  });
  t.throws(function() {
    union(arr1, {});
  });
  t.throws(function() {
    union(arr1, 'a');
  });
  t.end();
});
