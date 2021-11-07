var objectMap = map;

/*
  // returns a new object with the predicate applied to each value
  // like just-map-value, but (key, value) are passed to the predicate
  map({a: 3, b: 5, c: 9}, (key, value) => value + 1); // {a: 4, b: 6, c: 10}
  map({a: 3, b: 5, c: 9}, (key, value) => key); // {a: 'a', b: 'b', c: 'c'}
  map({a: 3, b: 5, c: 9}, (key, value) => key + value); // {a: 'a3', b: 'b5', c: 'c9'}
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

export {objectMap as default};
