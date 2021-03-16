module.exports = memoize;

function memoize(callback, resolver) {
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
