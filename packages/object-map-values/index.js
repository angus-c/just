module.exports = map;

/*
  // returns a new object with the predicate applied to each value
  // like just-map-object, but only the value argument is available
  map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
  map({a: 3, b: null, c: undefined}, (value) => Boolean); // {a: 3, b: false, c: false}
*/

function map(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    result[key] = predicate(obj[key]);
  }
  return result;
}
