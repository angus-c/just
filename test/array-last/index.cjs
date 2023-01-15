var test = require('../util/test')(__filename);
var last = require('../../packages/array-last');

test('non empty arrays return last', function(t) {
  t.plan(4);
  var testArrays = [
    [1, 2, 3, 4, 5],
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}],
    ['a', 1, true, /r/g],
  ];
  testArrays.forEach(function(arr) {
    t.equal(last(arr), arr[arr.length - 1]);
  });
  t.end();
});

test('empty arrays return undefined', function(t) {
  t.plan(1);
  t.equal(last([]), undefined);
  t.end();
});

test('non-array arguments throw', function(t) {
  t.plan(4);
  t.throws(function() {
    last({});
  });
  t.throws(function() {
    last(undefined);
  });
  t.throws(function() {
    last(null);
  });
  t.throws(function() {
    last();
  });
  t.end();
});
