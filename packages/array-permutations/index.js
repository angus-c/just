module.exports = permutations;

/*
  permutations([1, 2, 3]); // [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]
  permutations([1]); // 1
  random(); // throws
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

  const output = [];
  const partialPermutations = permutations(arr.slice(1));
  const first = arr[0];

  for (let i = 0; i < partialPermutations.length; i++) {
    const partial = partialPermutations[i];

    for (let j = 0; j <= partial.length; j++) {
      const start = partial.slice(0, j);
      const end = partial.slice(j);
      const merged = start.concat(first, end);

      output.push(merged);
    }
  }

  return output;
}
