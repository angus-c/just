var test = require('../util/test')(__filename);
var memoize = require('../../packages/function-memoize');

test('memoize with one parameter', function(t) {
  t.plan(3);

  var calc = memoize(function(a) {
    return a + 1;
  });

  t.deepEqual(calc.cache, {});

  var result = calc(2);

  t.deepEqual(calc.cache, {'{"0":2}': 3});
  t.equal(result, 3);

  t.end();
});

test('memoize with two parameters', function(t) {
  t.plan(3);

  var calc = memoize(function(a, b) {
    return a + b;
  }, function(a, b) {
    return [a, b].join('-');
  });

  t.deepEqual(calc.cache, {});
  var result = calc(5, 5);

  t.deepEqual(calc.cache, {'5-5': 10});
  t.equal(result, 10);

  t.end();
});

test('get result from cache using custom resolver', function(t) {
  t.plan(5);

  var concat = memoize(function(a, b, c) {
    return a + b + c;
  }, function() {
    return 'myKey';
  });

  t.deepEqual(concat.cache, {});
  var result = concat('a', 'b', 'c');

  t.deepEqual(concat.cache, {'myKey': 'abc'});
  t.equal(result, 'abc');

  var result2 = concat('d', 'e', 'f');
  t.deepEqual(concat.cache, {'myKey': 'abc'});
  t.equal(result2, 'abc');

  t.end();
});

test('throws an error when `resolver` is not a function', function(t) {
  t.plan(4);

  var callback = function(a, b) {
    return a + b;
  };

  t.throws(function() {
    memoize(callback, true);
  });

  t.throws(function() {
    memoize(callback, [1, 2]);
  });

  t.throws(function() {
    memoize(callback, 'myResolver');
  });

  t.throws(function() {
    memoize(callback, 123);
  });

  t.end();
});
