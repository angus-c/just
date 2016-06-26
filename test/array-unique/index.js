var test = require('tape');
var unique = require('../../array-unique');

test('primitives', function (t) {
  t.plan(3);
  t.deepEqual(unique([1, 2, 3, 2, 3, 4, 1]), [1, 2, 3, 4]);
  t.deepEqual(unique(['a', 'c', 'a', 'b', 'a', 'b', 'c']), ['a', 'c', 'b']);
  t.deepEqual(unique([true, true, false, false, true]), [true, false]);
});

test('objects by equality', function (t) {
  t.plan(3);
  var a = {a: 1};
  var b = {b: 3};
  var c = {c: 2};
  t.deepEqual(unique([a, b, a, c, a]), [a, b, c]);
  var fn1 = function () {};
  var fn2 = function () {};
  var fn3 = function () {};
  t.deepEqual(unique([fn1, fn2, fn3, fn2, fn3, fn2]), [fn1, fn2, fn3]);
  var arr1 = [1, 2, 3];
  var arr2 = [2, 3, 4];
  var arr3 = [4, 5, 6];
  t.deepEqual(unique([arr1, arr3, arr3, arr1, arr2]), [arr1, arr3, arr2]);
});

test('objects by comparator', function (t) {
  t.plan(2);
  var arr1 = [{x: 1}, {x: 2}, {x: 1}, {x: 3}, {x: 2}, {x: 1}, {x: 2}];
  var comparator = function (a, b) {return a.x === b.x;};
  t.deepEqual(unique(arr1, comparator), [{x: 1}, {x: 2}, {x: 3}]);
  var arr2 = [
    function () {},
    function (a) {},
    function () {},
    function (a, b) {},
    function () {}
  ];
  var comparator2 = function (a, b) {return a.length === b.length;};
  t.deepEqual(
    unique(arr2, comparator2).map(function (fn) {return fn.length;}),
    [0, 1, 2]
  );
});
