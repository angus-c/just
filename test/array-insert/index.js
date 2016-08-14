var test = require('tape');
var insert = require('../../packages/array-insert');

test('adds array elements at given index', function (t) {
  t.plan(2);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = ['a', 'b', 'c'];
  t.deepEqual(insert(arr1, arr2, 0), ['a', 'b', 'c', 1, 2, 3, 4, 5, 6]);
  t.deepEqual(insert(arr1, arr2, 2), [1, 2, 'a', 'b', 'c', 3, 4, 5, 6]);
  t.end();
});

test('adds array elements at start if no index supplied', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = ['a', 'b', 'c'];
  t.deepEqual(insert(arr1, arr2), ['a', 'b', 'c', 1, 2, 3, 4, 5, 6]);
  t.end();
});

test('adds array elements at end if index too big', function (t) {
  t.plan(1);
  var arr1 = [1, 2, 3, 4, 5, 6];
  var arr2 = ['a', 'b', 'c'];
  t.deepEqual(insert(arr1, arr2, 99), [1, 2, 3, 4, 5, 6, 'a', 'b', 'c']);
  t.end();
});

test('adds non array values at given index', function (t) {
  t.plan(3);
  var arr1 = [1, 2, 3, 4, 5, 6];
  t.deepEqual(insert(arr1, 2.5, 2), [1, 2, 2.5, 3, 4, 5, 6]);
  t.deepEqual(insert(arr1, {a: 4}, 2), [1, 2, {a: 4}, 3, 4, 5, 6]);
  t.deepEqual(insert(arr1, 'x'), ['x', 1, 2, 3, 4, 5, 6]);
  t.end();
});
