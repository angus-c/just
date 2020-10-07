var test = require('../util/test')(__filename);
var isPrime = require('../../packages/number-is-prime');

test('number is prime', function(t) {
  t.plan(3);
  t.ok(isPrime(2));
  t.ok(isPrime(17));
  t.ok(isPrime(13441));
  t.end();
});

test('number is not prime', function(t) {
  t.plan(5);
  t.notOk(isPrime(0));
  t.notOk(isPrime(1));
  t.notOk(isPrime(10));
  t.notOk(isPrime(-10));
  t.notOk(isPrime(13440));
  t.end();
});

test('throw error', function(t) {
  t.throws(function() {
    isPrime(undefined);
  });

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
    isPrime(function() {});
  });

  t.throws(function() {
    isPrime(2.5);
  });

  t.end();
});
