module.exports = splitAt;

/*
  splitAt([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4, 5]]
  splitAt([{a: 1}, {b: 1}, {c: 1}], -1); // [[{a: 1}, {b: 1}], [{c: 1}]]
  splitAt([], 2); // [[], []]
  splitAt(null, 1); // undefined
  splitAt(undefined, 1); // undefined
*/

function splitAt(array, n) {
  return Array.isArray(array) ? [array.slice(0, n), array.slice(n)] : undefined;
}
