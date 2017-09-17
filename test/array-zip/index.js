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

test('fill in blank spaces with undefined when given arrays of various lengths', function(t) {
  t.plan(1);

  var actual = zip([1, 2, 3], ['a', 'b'], [true]);
  var expected = [[1, 'a', true], [2, 'b', undefined], [3, undefined, undefined]];
  t.deepEqual(actual, expected);

  t.end();
});

test('throws for empty / non-array arguments', function(t) {
  t.plan(4);
  t.throws(function() {
    zip();
  });
  t.throws(function() {
    zip(null);
  });
  t.throws(function() {
    zip([1, 2, 3], {a: '1', b: '2', c: '3'});
  });
  t.throws(function() {
    zip([1, 2], ['a', 'b'], undefined, {}, false, 1, 'foo');
  });
  t.end();
});
