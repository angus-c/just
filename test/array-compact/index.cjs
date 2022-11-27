var test = require('../util/test')(__filename);
var compact = require('../../packages/array-compact');

test('removes all falsey types', function(t) {
  t.plan(1);
  t.deepEqual(compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5]), [
    1,
    2,
    3,
    4,
    5,
  ]);
  t.end();
});

test('does not remove empty objects', function(t) {
  t.plan(1);
  t.deepEqual(compact([1, 2, [], 4, {}]), [1, 2, [], 4, {}]);
  t.end();
});

test('returns empty array as-is', function(t) {
  t.plan(1);
  t.deepEqual(compact([]), []);
  t.end();
});

test('throws if argument is not an array', function(t) {
  t.plan(6);
  t.throws(function() {
    compact({});
  });
  t.throws(function() {
    compact('hello');
  });
  t.throws(function() {
    compact(/hello/);
  });
  t.throws(function() {
    compact(null);
  });
  t.throws(function() {
    compact(undefined);
  });
  t.throws(function() {
    compact();
  });
  t.end();
});
