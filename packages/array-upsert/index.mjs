var arrayUpsert = upsert;

/**
 * upsert([1,2,3,4],-1,2) // [1,2,-1,4]
 * upsert(["a","b","c"],"d",6) // ["a","b","c","d"]
 */
function upsert(arr, newItem, targetIndex) {
  var result = arr.slice();

  if (typeof targetIndex !== 'number') {
    throw new Error('third parameter must be a number');
  }

  if (targetIndex < 0 || targetIndex >= result.length) {
    // If target index is outside of the array, push the new item to the end.
    result.push(newItem);
  } else {
    result[targetIndex] = newItem;
  }

  return result;
}

export {arrayUpsert as deafult};
