module.exports = isEmpty;

/*
 isEmpty({a: 3, b: 5}) // false

 isEmpty(['a','b']) // false

 isEmpty({}) // true

 isEmpty([]) // true

 isEmpty(null) // true
*/

function isEmpty(obj) {
  return obj == null || (Array.isArray(obj) && !obj.length) || (typeof obj === 'object' && !Object.keys(obj).length);
}
