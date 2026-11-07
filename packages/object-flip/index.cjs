module.exports = flip;

/*
  // flip the key and value
  flip({a: 'x', b: 'y', c: 'z'}); // {x: 'a', y: 'b', z: 'c'}
  flip({a: 1, b: 2, c: 3}); // {'1': 'a', '2': 'b', '3': 'c'}
  flip({a: false, b: true}); // {false: 'a', true: 'b'}
*/

function flip(obj) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    var value = obj[key];
    if (value === '__proto__') {
      Object.defineProperty(result, value, {
        value: key,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      result[value] = key;
    }
  }
  return result;
}
