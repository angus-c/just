var test = require('../util/test')(__filename);
var tail = require('../../packages/array-tail');

test('non empty arrays return all but head', function(t) {
  t.plan(4);
  var testArrays = [
    [1, 2, 3, 4, 5],
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}],
    ['a', 1, true, /r/g],
  ];
  testArrays.forEach(function(arr) {
    t.deepEqual(tail(arr), arr.slice(1));
  });
  t.end();
});

test('empty arrays return an empty array', function(t) {
  t.plan(1);
  t.deepEqual(tail([]), []);
  t.end();
});

test('non-array arguments throw', function(t) {
  t.plan(4);
  t.throws(function() {
    tail({});
  });
  t.throws(function() {
    tail(undefined);
  });
  t.throws(function() {
    tail(null);
  });
  t.throws(function() {
    tail();
  });
  t.end();
});
