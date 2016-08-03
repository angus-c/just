module.exports = isObjectEmpty;

/*
 var obj = {a: 3, b: 5};
 objectEmpty(obj} // false

 var obj = {};
 objectEmpty(obj} // true

 var obj = null;
 objectEmpty(obj} // true
*/

function isObjectEmpty(obj) {
  if (obj == null) {
    return true;
  }

  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}
