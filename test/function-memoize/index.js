var test = require('../util/test')(__filename);
var memoize = require('../../packages/function-memoize');

var called;

test('memoize with one parameter', function(t) {
  t.plan(10);

  called = 0;

  var calc = memoize(function(a) {
    called++;
    return a + 1;
  });

  t.deepEqual(calc.cache, {});

  var result = calc(2);

  t.equal(called, 1);
  t.deepEqual(calc.cache, {'[2]': 3});
  t.equal(result, 3);

  var result = calc(2);

  t.equal(called, 1);
  t.deepEqual(calc.cache, {'[2]': 3});
  t.equal(result, 3);

  var result = calc(3);

  t.equal(called, 2);
  t.deepEqual(calc.cache, {'[2]': 3, '[3]': 4});
  t.equal(result, 4);

  t.end();
});

test('memoize with two parameters', function(t) {
  t.plan(10);

  called = 0;

  var calc = memoize(function(a, b) {
    called++;
    return a + b;
  });

  t.deepEqual(calc.cache, {});

  var result = calc(2, 5);

  t.equal(called, 1);
  t.deepEqual(calc.cache, {'[2,5]': 7});
  t.equal(result, 7);

  var result = calc(2, 7);

  t.equal(called, 2);
  t.deepEqual(calc.cache, {'[2,5]': 7, '[2,7]': 9});
  t.equal(result, 9);

  var result = calc(2, 5);

  t.equal(called, 2);
  t.deepEqual(calc.cache, {'[2,5]': 7, '[2,7]': 9});
  t.equal(result, 7);

  t.end();
});

test('memoize using variable resolver value', function(t) {
  t.plan(10);

  called = 0;

  var calc = memoize(
    function(a, b) {
      called++;
      return a + b;
    },
    function(a, b) {
      return [a, b].join('-');
    }
  );

  t.deepEqual(calc.cache, {});

  var result = calc(5, 5);

  t.equal(called, 1);
  t.deepEqual(calc.cache, {'5-5': 10});
  t.equal(result, 10);

  var result2 = calc(10, 2);

  t.equal(called, 2);
  t.deepEqual(calc.cache, {'5-5': 10, '10-2': 12});
  t.equal(result2, 12);

  var result3 = calc(10, 2);

  t.equal(called, 2);
  t.deepEqual(calc.cache, {'5-5': 10, '10-2': 12});
  t.equal(result3, 12);

  t.end();
});

test('memoize using constant variable value', function(t) {
  t.plan(7);

  called = 0;

  var concat = memoize(
    function(a, b, c) {
      called++;
      return a + b + c;
    },
    function() {
      return 'myKey';
    }
  );

  t.deepEqual(concat.cache, {});

  var result = concat('a', 'b', 'c');

  t.equal(called, 1);
  t.deepEqual(concat.cache, {myKey: 'abc'});
  t.equal(result, 'abc');

  var result2 = concat('d', 'e', 'f');

  t.equal(called, 1);
  t.deepEqual(concat.cache, {myKey: 'abc'});
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

test('throws an error when `callback` is not a function', function(t) {
  t.plan(6);

  t.throws(function() {
    memoize();
  });

  t.throws(function() {
    memoize(true);
  });

  t.throws(function() {
    memoize('myCallback');
  });

  t.throws(function() {
    memoize({});
  });

  t.throws(function() {
    memoize([1, 2, 3]);
  });

  t.throws(function() {
    memoize(123);
  });

  t.end();
});
