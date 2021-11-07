var objectFlip = flip;

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
    result[obj[key]] = key;
  }
  return result;
}

export {objectFlip as default};
