var arrayInsert = insert;

/*
  insert([1, 2, 5, 6], ['a', 'c', 'e'], 2); // [1, 2, 'a', 'c', 'e', 5, 6]
  insert([1, 2, 5, 6], 'a', 2); // [1, 2, 'a', 5, 6]
  insert([1, 2, 5, 6], ['a', 'c', 'e'], 0); // ['a', 'c', 'e', 1, 2, 5, 6]
  insert([1, 2, 5, 6], ['a', 'c', 'e']); // ['a', 'c', 'e', 1, 2, 5, 6]
*/

function insert(arr1, arr2, index) {
  if (!Array.isArray(arr1)) {
    throw new Error('expected an array for first argument');
  }
  if (arguments.length > 2 && typeof index != 'number') {
    throw new Error('expected a number for third argument');
  }
  if (!Array.isArray(arr2)) {
    arr2 = [arr2];
  }
  if (!index) {
    return arr2.concat(arr1);
  }
  var front = arr1.slice(0, index);
  var back = arr1.slice(index);
  return front.concat(arr2, back);
}

export {arrayInsert as default};
