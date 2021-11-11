function deepMapValues(obj, fn) {
  return Object.keys(obj).reduce(function (acc, key) {
    var value = obj[key];
    acc[key] =
      Object.prototype.toString.call(value) === '[object Object]'
        ? deepMapValues(value, fn)
        : fn(value, key);
    return acc;
  }, {});
}

module.exports = deepMapValues;
