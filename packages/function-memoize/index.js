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

function memoize(callback, options, resolver) {
  if (typeof callback !== 'function') {
    throw new Error('`callback` should be a function');
  }

  if (options !== undefined && typeof options !== 'object') {
    throw new Error('`options` should be an object');
  }

  if (resolver !== undefined && typeof resolver !== 'function') {
    throw new Error('`resolver` should be a function');
  }

  var cache = new Map();

  var memoized = function() {
    var args = Array.prototype.slice.call(arguments); // to simplify JSON.stringify
    var key = resolver ? resolver.apply(this, args) : JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, callback.apply(this, args));
    }

    if (typeof options.max === 'number' && cache.size > options.max) {
      var firstKey = cache.keys()[0];
      cache.delete(firstKey);
    }

    return cache.get(key);
  };

  memoized.cache = cache;

  return memoized;
}
