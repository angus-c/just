module.exports = isEmpty;

/*
 isEmpty({a: 3, b: 5}) // false
 isEmpty([1, 2]) // false
 isEmpty(new Set([1, 2, 2])) // false
 isEmpty((new Map()).set('a', 2)) // false
 isEmpty({}) // true
 isEmpty([]) // true
 isEmpty(new Set()) // true
 isEmpty(new Map()) // true
 isEmpty(0) // true
 isEmpty(1) // true
 isEmpty(true) // true
 isEmpty(null) // true
 isEmpty(undefined) // true
*/

function isEmpty(obj) {
  if (obj == null) {
    return true;
  }

  if (Array.isArray(obj)) {
    return !obj.length;
  }

  var type = {}.toString.call(obj);

  if (type == '[object Object]') {
    return !Object.keys(obj).length;
  }

  if (type == '[object Map]' || type == '[object Set') {
    return !obj.size;
  }

  // primitive || unidentifed object type
  return Object(obj) === obj || !Object.keys(obj).length;
}
