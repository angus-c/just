var test = require('../util/test')(__filename);
var unique = require('../../packages/array-unique');
var compare = require('../../packages/collection-compare');

test('primitives', function(t) {
  t.plan(4);
  t.deepEqual(unique([1, 2, 3, 2, 3, 4, 1]), [1, 2, 3, 4]);
  t.deepEqual(unique(['a', 'c', 'a', 'b', 'a', 'b', 'c']), ['a', 'c', 'b']);
  t.deepEqual(unique([true, true, false, false, true]), [true, false]);
  t.ok(compare(unique([NaN, NaN, NaN]), [NaN]));
  t.end();
});

test('objects by equality', function(t) {
  t.plan(3);
  var a = {a: 1};
  var b = {b: 3};
  var c = {c: 2};
  t.deepEqual(unique([a, b, a, c, a]), [a, b, c]);
  var fn1 = function() {};
  var fn2 = function() {};
  var fn3 = function() {};
  t.deepEqual(unique([fn1, fn2, fn3, fn2, fn3, fn2]), [fn1, fn2, fn3]);
  var arr1 = [1, 2, 3];
  var arr2 = [2, 3, 4];
  var arr3 = [4, 5, 6];
  t.deepEqual(unique([arr1, arr3, arr3, arr1, arr2]), [arr1, arr3, arr2]);
});

test('presorted arrays', function(t) {
  t.plan(5);
  t.deepEqual(unique([1, 1, 2, 2, 3, 3, 4, 4], true), [1, 2, 3, 4]);
  t.deepEqual(unique(['a', 'a', 'b', 'b', 'c', 'c'], true), ['a', 'b', 'c']);
  var a = {a: 1};
  var b = {b: 3};
  var c = {c: 2};
  t.deepEqual(unique([a, a, b, b, c, c], true), [a, b, c]);
  // bogus sorted declarations fail
  t.notDeepEqual(unique([1, 2, 1, 3, 4, 4, 1], true), [1, 2, 3, 4]);
  t.notDeepEqual(unique([a, b, a, c, b, b], true), [a, b, c]);
});

test('using strings option', function(t) {
  t.plan(7);
  // works for arrays of strings
  t.deepEqual(unique(['a', 'b', 'a', 'b', 'a', 'c'], false, true), ['a', 'b', 'c']);

  // converts other homogenous primitives to strings
  t.deepEqual(unique([1, 2, 1, 2, 3, 3, 4, 4], false, true), ['1', '2', '3', '4']);
  t.deepEqual(unique([false, true, false, false], false, true), ['false', 'true']);

  // works for arrays of same-type non-primitives (ignores strings flag)
  var a = {a: 1};
  var b = {b: 3};
  var c = {c: 2};
  t.deepEqual(unique([a, b, a, b, b, c], false, true), [a, b, c]);
  var fn1 = function() {};
  var fn2 = function() {};
  var fn3 = function() {};
  t.deepEqual(unique([fn1, fn2, fn3, fn2, fn3, fn2], false, true), [fn1, fn2, fn3]);

  // fails for arrays of different-type primitives
  t.notDeepEqual(unique([1, 2, '1', 2, '3', false], false, true), [1, 2, '1', '3', false]);

  // works when sorted option overrides
  t.deepEqual(unique(['a', 'b', 'b', 'b', 'b', 'c'], true, true), ['a', 'b', 'c']);
});

test('throws if first argument is not an array', function(t) {
  t.plan(3);
  t.throws(function() {
    unique(undefined);
  });
  t.throws(function() {
    unique(null, true);
  });
  t.throws(function() {
    unique({}, true, true);
  });
  t.end();
});

test('throws if second argument is not a boolean', function(t) {
  t.plan(2);
  t.throws(function() {
    unique([1, 2, 3, 4], '2');
  });
  t.throws(function() {
    unique([1, 2, 3, 4], {}, true);
  });
  t.end();
});

test('throws if third argument is not a boolean', function(t) {
  t.plan(2);
  t.throws(function() {
    unique([1, 2, 3, 4], true, 5);
  });
  t.throws(function() {
    unique([1, 2, 3, 4], true, /4/);
  });
  t.end();
});
