var test = require('../util/test')(__filename);
var memoize = require('../../packages/function-memoize');

test('memoize with one parameter', function(t) {
  t.plan(1);

  var cached = memoize(function(a) {
    return a + 1;
  });

  var result = cached(2);

  t.same(result, 3);

  t.end();
});

test('memoize with two parameter', function(t) {
  t.plan(1);

  var cached = memoize(function(a, b) {
    return a + b;
  }, function(a, b) {
    return [a, b].join('-');
  });

  var result = cached(5, 5);

  t.same(result, 10);

  t.end();
});

test('memoize with three parameter', function(t) {
  t.plan(1);

  var cached = memoize(function(a, b, c) {
    return a + b + c;
  }, function(a, b, c) {
    return [a, b, c].join('-');
  });

  var result = cached('a', 'b', 'c');

  t.same(result, 'abc');

  t.end();
});
