var test = require('../util/test')(__filename);
var flatten = require('../../packages/array-flatten');

test('flattened arrays are unchanged', function(t) {
  t.plan(1);
  var arr = [1, 2, 3, 4, 5];
  t.deepEqual(flatten(arr), arr);
  t.end();
});

test('unflattened arrays are flattened', function(t) {
  t.plan(2);
  var arr1 = [1, [2, 3], [4, [5, 6], 7], 8];
  t.deepEqual(flatten(arr1), [1, 2, 3, 4, 5, 6, 7, 8]);
  var arr2 = [{a: 4}, [{b: 5}, {c: false}], {d: 'd'}];
  t.deepEqual(flatten(arr2), [{a: 4}, {b: 5}, {c: false}, {d: 'd'}]);
  t.end();
});

test('throws on non-arrays return an empty array', function(t) {
  t.plan(3);
  t.throws(function() {
    flatten({n: 4});
  });
  t.throws(function() {
    flatten(2);
  });
  t.throws(function() {
    flatten(undefined);
  });
  t.end();
});
