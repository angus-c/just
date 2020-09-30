module.exports = isPrime;

/*
  isPrime(1); // false
  isPrime(2); // true
  isPrime(17); // true
  isPrime(10); // false
*/

function isPrime(number) {
  if (!Number.isInteger(number)) {
    throw new Error('Expected an integer');
  }

  if (number < 2) {
    return false;
  }

  for (var i = 2; i < Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }

  return true;
}
