var objectMapValues = map;

/*
  // returns a new object with the predicate applied to each value
  // like just-map-object, but (value, key, object) are passed to the predicate
  map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
  map({a: 3, b: 5, c: 9}, (value, key) => value + key); // {a: 3a, b: 5b, c: 9c}
  map({a: 3, b: 5, c: 9}, (value, key, object) => object.b); // {a: 5, b: 5, c: 5}
*/

function map(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    result[key] = predicate(obj[key], key, obj);
  }
  return result;
}

export {objectMapValues as default};
