var test = require('../util/test')(__filename);
var groupBy = require('../../packages/array-group-by');

test('throws if first argument is not an array', function(t) {
  t.plan(6);
  t.throws(function() {
    groupBy({}, function() {});
  });
  t.throws(function() {
    groupBy('hello', function() {});
  });
  t.throws(function() {
    groupBy(/hullo/, function() {});
  });
  t.throws(function() {
    groupBy(null, function() {});
  });
  t.throws(function() {
    groupBy(undefined, function() {});
  });
  t.throws(function() {
    groupBy();
  });
  t.end();
});

test('throws if second argument is not a function', function(t) {
  t.plan(6);
  t.throws(function() {
    groupBy([], {});
  });
  t.throws(function() {
    groupBy([], []);
  });
  t.throws(function() {
    groupBy([], /hullo/);
  });
  t.throws(function() {
    groupBy([], null);
  });
  t.throws(function() {
    groupBy([], undefined);
  });
  t.throws(function() {
    groupBy([]);
  });
  t.end();
});

test('should return grouped objects', function(t) {
  t.plan(2);
  var result1 = groupBy([6.1, 4.2, 6.3], Math.floor);
  t.deepEqual(result1, {'4': [4.2], '6': [6.1, 6.3]});
  var result2 = groupBy([1, 2, 3, 4, 5, 6, 7, 8], function(i) { return i % 2; });
  t.deepEqual(result2, {'0': [2, 4, 6, 8], '1': [1, 3, 5, 7]});
  t.end();
});
