var collectionFlush = flush;

/*
  flush([1, undefined, 2, null, 3, NaN, 0]); // [1, 2, 3, NaN, 0]
  flush([true, null, false, true, [null], undefined]); // [true, false, true, [null]]
  flush({a: 2, b: null, c: 4, d: undefined}); // {a: 2, c: 4}
  flush('something'); // undefined
  flush(); // undefined
*/

function flush(collection) {
  var result, len, i;
  if (!collection) {
    return undefined;
  }
  if (Array.isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      var elem = collection[i];
      if (elem != null) {
        result.push(elem);
      }
    }
    return result;
  }
  if (typeof collection == 'object') {
    result = {};
    var keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      var key = keys[i];
      var value = collection[key];
      if (value != null) {
        result[key] = value;
      }
    }
    return result;
  }
  return undefined;
}

export {collectionFlush as default};
