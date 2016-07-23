module.exports = last;

/*
  last([1, 2, 3, 4, 5]); // 5
  last([{a: 1}, {b: 1}, {c: 1}]); // {c: 1}
  last([true, false, [true, false]]); // [true, false]
*/

function last(arr) {
  return arr != null ? arr[arr.length - 1] : undefined;
}
