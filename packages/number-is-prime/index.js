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

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function isPrime(number) {
  if (!Number.isInteger(number)) {
    throw new Error('just-is-prime expects an integer argument');
  }

  if (number < 2) {
    return false;
  }

  for (var i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
