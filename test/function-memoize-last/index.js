var test = require('../util/test')(__filename);
var memoizeLast = require('../../packages/function-memoize-last');

test('memoize with one parameter', function(t) {
  t.plan(4);

  var counter = 0;
  var memoized = memoizeLast(function(x) {
    counter++;
    return x + 2;
  });

  var result1 = memoized(2);
  var result2 = memoized(2);

  t.equal(counter, 1);
  t.equal(result1, result2);

  var result3 = memoized(3);
  t.equal(counter, 2);
  t.equal(result3, 5);

  t.end();
});

test('memoize with multiple parameters', function(t) {
  t.plan(4);

  var counter = 0;
  var memoized = memoizeLast(function(x, y, z) {
    counter++;
    return x * y * z;
  });

  var result1 = memoized(1, 2, 3);
  var result2 = memoized(1, 2, 3);

  t.equal(counter, 1);
  t.equal(result1, result2);

  var result3 = memoized(3, 4, 5);
  t.equal(counter, 2);
  t.equal(result3, 60);

  t.end();
});

test('memoize compares arguments and this', function(t) {
  t.plan(5);

  var counter = 0;
  var memoized = memoizeLast(function(x, y) {
    counter++;
    return this.a + x + y;
  });

  var obj = {
    a: 'x',
    memoized: memoized,
  };

  var result1 = obj.memoized('x1', 'y1');
  var result2 = obj.memoized('x1', 'y1');

  t.equal(counter, 1);
  t.equal(result1, result2);
  t.equal(result1, 'xx1y1');

  var obj2 = {
    a: 'y',
    memoized: memoized,
  };

  var result3 = obj2.memoized('x1', 'y1');

  t.equal(counter, 2);
  t.equal(result3, 'yx1y1');

  t.end();
});

test('compare using isEqual', function(t) {
  t.plan(9);

  var args = [];
  var counter1 = 0;

  var memoized1 = memoizeLast(function(x, y) {
    counter1++;
    return x + y;
  }, function(lastArgs, newArgs) {
    args = [];
    args.push(lastArgs, newArgs);
    return true;
  });

  var result1 = memoized1(1, 2);
  var result2 = memoized1(1, 3);

  t.equal(counter1, 1);
  t.equal(result1, result2);
  t.equal(result2, 3);
  t.deepEqual(args, [[1, 2], [1, 3]]);

  var counter2 = 0;
  var memoized2 = memoizeLast(function(x, y) {
    counter2++;
    return x + y;
  }, function(lastArgs, newArgs) {
    args = [];
    args.push(lastArgs, newArgs);
    return false;
  });

  var result3 = memoized2(1, 2);
  var result4 = memoized2(1, 3);

  t.equal(counter2, 2);
  t.notEqual(result3, result4);
  t.equal(result3, 3);
  t.equal(result4, 4);
  t.deepEqual(args, [[1, 2], [1, 3]]);

  t.end();
});

test('throws an error when `fn` is not a function', function(t) {
  t.plan(6);

  t.throws(function() {
    memoizeLast();
  });
  t.throws(function() {
    memoizeLast(true);
  });
  t.throws(function() {
    memoizeLast('myCallback');
  });
  t.throws(function() {
    memoizeLast({});
  });
  t.throws(function() {
    memoizeLast([1, 2, 3]);
  });
  t.throws(function() {
    memoizeLast(123);
  });

  t.end();
});

test('throws an error when `isEqual` is defined but it is not a function', function(t) {
  t.plan(4);

  t.throws(function() {
    memoizeLast(function() {}, true);
  });

  t.throws(function() {
    memoizeLast(function() {}, []);
  });

  t.throws(function() {
    memoizeLast(function() {}, 'js');
  });

  t.throws(function() {
    memoizeLast(function() {}, 1);
  });

  t.end();
});
