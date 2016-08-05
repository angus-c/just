module.exports = isEmpty;

/*
 isEmpty({a: 3, b: 5}) // false
 isEmpty(['a','b']) // false
 isEmpty({}) // true
 isEmpty([]) // true
 isEmpty(null) // true
 isEmpty(undefined) // true
*/

function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (Array.isArray(obj)) {
    return !obj.length;
  }

  if (typeof obj == 'object') {
    return !Object.keys(obj).length;
  }
}
