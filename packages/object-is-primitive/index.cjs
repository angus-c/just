module.exports = isPrimitive;

/*
  isPrimitive('hi') // true
  isPrimitive(3) // true
  isPrimitive(true) // true
  isPrimitive(false) // true
  isPrimitive(null) // true
  isPrimitive(undefined) // true
  isPrimitive(Symbol()) // true
  isPrimitive({}) // false
  isPrimitive([]) // false
  isPrimitive(function() {}) // false
  isPrimitive(new Date()) // false
  isPrimitive(/a/) // false
*/

function isPrimitive(obj) {
  return obj !== Object(obj);
}
