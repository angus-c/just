var objectMapKeys = map;

/*
map({a: 'cow', b: 'sheep', c: pig'}, (value) => value);
  // {cow: 'cow', sheep: 'sheep', pig: pig'}
map([4, 5, 6], (value, key) => key + 1); // {1: 4, 2: 5, 3: 6}
map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
map({a: 3, b: 5, c: 9}, (value, key, object) => key + object.b);
  // {a5: 3, b5: 5, c5: 9}
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

export {objectMapKeys as default};
