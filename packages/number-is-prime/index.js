module.exports = isPrime;

/*
  isPrime(1); // false
  isPrime(2); // true
  isPrime(17); // true
  isPrime(10); // false
  isPrime(); // throws
  isPrime(null); // throws
  isPrime("js"); // throws
  isPrime({}); // throws
  isPrime(function() {}); // throws
  isPrime([]); // throws
*/

function isPrime(number) {
  if (!Number.isInteger(number)) {
    throw new Error('just-is-prime expects an integer argument');
  }

  if (number < 2) {
    return false;
  }

  if (number % 2 === 0) {
    return (number === 2);
  }

  for (var i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
