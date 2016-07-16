module.exports = map;

/*
  // returns a new object with the predicate applied to each value
  map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
  map({a: 3, b: 5, c: 9}, (value, index) => index); // {a: 0, b: 1, c: 2}
  map({a: 3, b: 5, c: null}, (value, index) => Boolean); // {a: true, b: true, c: false}
  map({a: 3, b: 5, c: 9}, (key, value, obj) => obj[i + 1]); // {a: 5, b: 9, c: undefined}
*/

function map(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    result[key] = predicate(key, obj[key]);
  }
  return result;
}
