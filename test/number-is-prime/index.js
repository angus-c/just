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
