module.exports = memoize;

/*
  const sumByOne = memoize(function(value) {
    return value + 1;
  });

  sumByOne(10);
  sumByOne(10); -- Cache hit!

  sumByOne(20);
  sumByOne(20); -- Cache hit!

  // Custom cache
  var sum = memoize(function(a, b) {
    return a + b
  }, function(a, b) {
    return `${a}-${b}`
  })

  sum(10, 10)
  sum(10, 20)
  sum(10, 20) -- Cache hit!
*/

function memoize(callback, resolver) {
  if (resolver !== undefined && typeof resolver !== 'function') {
    throw new Error('`resolver` should be a function');
  }

  var cache = {};

  var memoized = function() {
    var args = arguments;
    var key = resolver ? resolver.apply(this, args) : args[0];

    if (!(key in cache)) {
      cache[key] = callback.apply(this, args);
    }

    return cache[key];
  };

  memoized.cache = cache;

  return memoized;
}
