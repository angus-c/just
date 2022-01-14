var objectIsCircular = isCircular;

/*
 const a = {};
 a.b = a;
 isCircular(a) // true

 const a = {};
 a.b = {
   c: a
 }
 isCircular(a) // true

 const a = {};
 a.b = {
   c: 4
 }
 isCircular(a) // false

 const a = [];
 a.push(a);
 isCircular(a) // true

 isCircular({}) // false
 isCircular('hi') // false
 isCircular(undefined) // false
*/

// safari, ff, chrome/opera
var errorKeywords = ['circular', 'cyclic'];

function isCircular(obj) {
  if (typeof obj === 'function') {
    throw new Error('cannot determine if function is circular');
  }
  try {
    JSON.stringify(obj);
  } catch (err) {
    var index = errorKeywords.length;
    while (index--) {
      if (err.message.indexOf(errorKeywords[index]) > -1) {
        return true;
      }
    }
    throw err;
  }
  return false;
}

export {objectIsCircular as default};
