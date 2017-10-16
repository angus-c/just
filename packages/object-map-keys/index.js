module.exports = map;

/*
  map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a1: 3, b1: 5, c1: 9}
  map([4, 5, 6], (key) => key + 1); // [0, 4, 5, 6]
  map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
  map({a: 3, b: 5, c: 9}, (value, key, object) => key + object.b); // {a5: 3, b5: 5, c5: 9}
*/

function map(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    var value = obj[key];
    var newKey = predicate(value, key, obj);
    result[newKey] = value;
  }
  return result;
}
