var test = require('../util/test')(__filename);
var isPrime = require('../../packages/number-is-prime');

test('number is prime', function(t) {
  t.plan(2);
  t.ok(isPrime(2));
  t.ok(isPrime(17));
  t.end();
});

test('number is not prime', function(t) {
  t.plan(2);
  t.notOk(isPrime(1));
  t.notOk(isPrime(10));
  t.end();
});

test('throw error', function(t) {
  t.throws(function() {
    isPrime(null);
  });

  t.throws(function() {
    isPrime('js');
  });

  t.throws(function() {
    isPrime();
  });

  t.throws(function() {
    isPrime([]);
  });

  t.throws(function() {
    isPrime({});
  });

  t.throws(function() {
    isPrime(function() { });
  });

  t.end();
});
