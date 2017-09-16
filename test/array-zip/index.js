var test = require('../util/test')(__filename);
var zip = require('../../packages/array-zip');

test('zips any number of arrays together', function(t) {
  t.plan(3);

  var actual = zip([1, 2, 3]);
  var expected = [[1], [2], [3]];
  t.deepEqual(actual, expected);

  actual = zip([1, 2], ['a', 'b']);
  expected = [[1, 'a'], [2, 'b']];
  t.deepEqual(actual, expected);

  actual = zip([1, 2], ['a', 'b'], [true, false]);
  expected = [[1, 'a', true], [2, 'b', false]];
  t.deepEqual(actual, expected);

  t.end();
});

test('returns an empty array for incorrect inputs', function(t) {
  t.plan(1);

  var actual = zip(undefined, {}, false, 1, 'foo');
  var expected = [];
  t.deepEqual(actual, expected);

  t.end();
});

test('skips incorrect inputs', function(t) {
  t.plan(1);

  var actual = zip([1, 2], ['a', 'b'], undefined, {}, false, 1, 'foo');
  var expected = [[1, 'a'], [2, 'b']];
  t.deepEqual(actual, expected);

  t.end();
});

test('fill in blank spaces with undefined when given arrays of various lengths', function(
  t
) {
  t.plan(1);

  var actual = zip([1, 2, 3], ['a', 'b'], [true]);
  var expected = [
    [1, 'a', true],
    [2, 'b', undefined],
    [3, undefined, undefined],
  ];
  t.deepEqual(actual, expected);

  t.end();
});
