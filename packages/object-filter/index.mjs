var objectFilter = filter;

/*
  var obj = {a: 3, b: 5, c: 9};
  filter(obj, function(key, value) {
    return value < 6;
  }); // {a: 3, b: 5}

  var obj = {a1: 3, b1: 5, a2: 9};
  filter(obj, function(key, value) {
    return key[0] == 'a';
  }); // {a1: 3, a2: 9}

  var obj = {a: 3, b: 5, c: null};
  filter(obj, function(key, value) {
    return value;
  }); // {a: 3, b: 5}
*/

function filter(obj, predicate) {
  var result = {};
  var keys = Object.keys(obj);
  var len = keys.length;
  for (var i = 0; i < len; i++) {
    var key = keys[i];
    if (predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}

export {objectFilter as default};
