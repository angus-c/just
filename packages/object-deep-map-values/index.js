module.exports = deepMapValues;

function deepMapValues(obj, fn) {
  if (!isObject(obj)) {
    throw new Error('First argument must be an object');
  }
  if (!(fn instanceof Function)) {
    throw new Error('Second argument must be a function');
  }

  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (let i = 0; i < len; i++) {
    var key = keys[i];
    var value = obj[key];
    result[key] = isObject(value) ? deepMapValues(value, fn) : fn(value, key);
  }
  return result;
}

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
