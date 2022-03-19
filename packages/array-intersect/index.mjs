var arrayIntersect = intersect;

/*
  intersect([1, 2, 5, 6], [2, 3, 5, 6]); // [2, 5, 6]
  intersect([1, 2, 2, 4, 5], [3, 2, 2, 5, 7]); // [2, 5]
*/

function intersect(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }

  var result = [];
  var set = convertArrayToSet(arr2);
  var memo = {};

  for (var i = 0; i < arr1.length; i++) {
    var item = arr1[i];

    if (set.hasOwnProperty(item) && !memo.hasOwnProperty(item)) {
      result.push(item);
      memo[item] = true;
    }
  }

  return result;
}

function convertArrayToSet(arr) {
  var output = {};

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (!output.hasOwnProperty(item)) {
      output[item] = true;
    }
  }

  return output;
}

export {arrayIntersect as default};
