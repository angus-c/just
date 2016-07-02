module.exports = pluck;

/*
  var arr = [{a:1, b:2}, {a:4, b:3}, {a:2, b:5}];
  pluck(arr, 'a'); // [1, 4, 2]
  var obj = {x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}];
  pluck(obj, 'a'); // {x: 1, y: 4, z: 2}
*/

function pluck(collection, propertyName) {
  if (!collection || typeof collection != 'object') {
    return new Error('expected first argument to be an object or array');
  }

  var result, len, i, keys, key;
  if (Array.isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      result.push(collection[i][propertyName]);
    }
  } else {
    result = {};
    keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      key = keys[i];
      result[key] = collection[key][propertyName];
    }
  }
  return result;
}
