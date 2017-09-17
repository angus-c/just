module.exports = findIndexOf;

/*
    var arrOfObjs = [{a: 5, b: 3}, {a: 7, b: 4}, {a: 7, b: 8}, {a: 5, b: 10}];
    findIndexOf(arrOfObjs, 'a', 5); // 0
    findIndexOf([[4, 5, 6, 7], [3, 4, 5, 6], [0, 2, 3, 7]], 1, 2); // 2
    findIndexOf(arrOfObjs, 'b', 5); // -1
    findIndexOf([], 'b', 5); // -1
    findIndexOf(arrOfObjs); // throws
    findIndexOf(undefined, 'a', 3); // throws
*/
function findIndexOf(objArr, searchProp, searchValue) {
  if (!Array.isArray(objArr)) {
    throw new Error('first argument must be an array');
  }
  if (arguments.length < 3) {
    throw new Error('must provide a key and value to search for');
  }
  var found = -1;
  var length = objArr.length;
  for (var i = 0; i < length; i++) {
    var item = objArr[i];
    if (typeof item === 'object') {
      if (item[searchProp] === searchValue) {
        found = i;
        break;
      }
    }
  }
  return found;
}
