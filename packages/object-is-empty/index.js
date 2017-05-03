module.exports = isEmpty;

/*
 isEmpty({a: 3, b: 5}) // false
 isEmpty(['a','b']) // false
 isEmpty({}) // true
 isEmpty([]) // true
 isEmpty(0) // true
 isEmpty(1) // false
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

  if (typeof obj == 'object') {
    return !Object.keys(obj).length;
  }

  return !obj;
}
