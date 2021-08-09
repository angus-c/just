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

function Order() {
  this.keys = [];
  this.cache = {};
}

Order.prototype = {
  'has': function(key) {
    return this.cache.hasOwnProperty(key);
  },

  'get': function(key) {
    return this.cache[key];
  },

  'set': function(key, value) {
    if (!this.has(key)) {
      this.keys.push(key);
    }

    this.cache[key] = value;
  },

  'delete': function(key) {
    var index = this.keys.indexOf(key);
    this.keys.splice(index, 1);
    delete this.cache[key];
  },

  'keys': function() {
    return this.keys;
  },
};

function memoize(callback, resolver, options) {
  if (typeof callback !== 'function') {
    throw new Error('`callback` should be a function');
  }

  if (resolver !== undefined && typeof resolver !== 'function') {
    throw new Error('`resolver` should be a function');
  }

  if (options !== undefined && typeof options !== 'object') {
    throw new Error('`options` should be an object');
  }

  var cache = 'Map' in (typeof window === 'undefined' ? global : window) ? new Map() : new Order();

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
