var test = require('../util/test')(__filename);
var partition = require('../../packages/array-partition');

// import partition from 'just-partition';

// partition([1, 5, 2, 4, 3], n => n > 3); // [[5, 4],[1, 2, 3]]
// partition(['a', 2, 3, '3'], x => typeof x == 'string'); // [['a', '3'],[2, 3]]
// partition([1, 2, 3, 4], x => typeof x == 'number'); // [[1, 2, 3, 4],[]]
// partition([1, 2, 3, 4], x => typeof x == 'string'); // [[], [1, 2, 3, 4]]
// partition([], n => n > 3); // [[], []]
// partition({a: 1, b: 2}, n => n > 1); // throws
// partition(null, n => n > 1); // throws
// partition(undefined, n => n > 1); // throws

test('populated arrays', function(t) {
  t.plan(4);
  var result;
  result = partition([1, 5, 2, 4, 3], function(n) {
    return n > 3;
  });
  t.deepEqual(result, [[5, 4], [1, 2, 3]]);
  result = partition(['a', 2, 3, '3'], function(x) {
    return typeof x == 'string';
  });
  t.deepEqual(result, [['a', '3'], [2, 3]]);
  result = partition([1, 2, 3, 4], function(x) {
    return typeof x == 'number';
  });
  t.deepEqual(result, [[1, 2, 3, 4], []]);
  result = partition([1, 2, 3, 4], function(x) {
    return typeof x == 'string';
  });
  t.deepEqual(result, [[], [1, 2, 3, 4]]);
  t.end();
});

test('sparse arrays', function(t) {
  t.plan(2);
  var result;
  result = partition([1, 5, 2, , , 4, 3], function(n) {
    return n > 3;
  });
  t.deepEqual(result, [[5, 4], [1, 2, undefined, undefined, 3]]);
  result = partition([1, 2, 3, , , 4], function(x) {
    return typeof x == 'undefined';
  });
  t.deepEqual(result, [[undefined, undefined], [1, 2, 3, 4]]);
  t.end();
});

test('empty array', function(t) {
  t.plan(1);
  var result = partition([], function(n) {
    return n > 3;
  });
  t.deepEqual(result, [[], []]);
  t.end();
});

test('illegal arguments', function(t) {
  t.plan(4);
  t.throws(function() {
    partition({a: 1, b: 2}, function(n) {
      return n > 3;
    });
  });
  t.throws(function() {
    partition(null, function(n) {
      return n > 3;
    });
  });
  t.throws(function() {
    partition(undefined, function(n) {
      return n > 3;
    });
  });
  t.throws(function() {
    partition([1, 2, 3], []);
  });
  t.end();
});
