var test = require('../util/test')(__filename);
var remove = require('../../packages/array-remove');

test('returns elements unique to first array', function(t) {
  t.plan(4);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = [1, 3, 6];
  t.deepEqual(remove(arr1, arr2), [2, 4, 5]);
  arr1 = ['a', 'b', 'c', 'd'];
  arr2 = ['c', 'd'];
  t.deepEqual(remove(arr1, arr2), ['a', 'b']);
  arr1 = [1, 2, 3, 4, 5, 6];
  arr2 = [];
  t.deepEqual(remove(arr1, arr2), [1, 2, 3, 4, 5, 6]);
  arr1 = [];
  arr2 = [1, 2, 3, 4, 5, 6];
  t.deepEqual(remove(arr1, arr2), []);
  t.end();
});

test("throws if first two arguments aren't arrays", function(t) {
  t.plan(8);
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];
  t.throws(function() {
    remove(undefined, arr2);
  });
  t.throws(function() {
    remove(null, arr2);
  });
  t.throws(function() {
    remove({}, arr2);
  });
  t.throws(function() {
    remove('a', arr2);
  });
  t.throws(function() {
    remove(arr1, undefined);
  });
  t.throws(function() {
    remove(arr1, null);
  });
  t.throws(function() {
    remove(arr1, {});
  });
  t.throws(function() {
    remove(arr1, 'a');
  });
  t.end();
});
