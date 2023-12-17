var arrayPermutations = permutations;

/*
  permutations([1, 2, 3]); // [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]
  permutations([1]); // [[1]]
  permutations(); // throws
*/
function permutations(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('just-array-permutations expects an array');
  }

  if (!arr.length) {
    return [];
  }

  if (arr.length === 1) {
    return [arr];
  }

  var output = [];
  var partialPermutations = permutations(arr.slice(1));
  var first = arr[0];

  for (var i = 0, len = partialPermutations.length; i < len; i++) {
    var partial = partialPermutations[i];

    for (var j = 0, len2 = partial.length; j <= len2; j++) {
      var start = partial.slice(0, j);
      var end = partial.slice(j);
      var merged = start.concat([first], end);

      output.push(merged);
    }
  }

  return output;
}

export {arrayPermutations as default};
