module.exports = objectEmpty;

/*
 var obj = {a: 3, b: 5};
 objectEmpty(obj} // false

 var obj = {};
 objectEmpty(obj} // true

 var obj = null;
 objectEmpty(obj} // true
*/

function objectEmpty(obj1, obj2 /*, [objn]*/) {
  if (obj == null) {
    return true;
  }

  for(var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}
