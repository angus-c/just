module.exports = tail;

/*
  tail([1, 2, 3, 4, 5]); // [2, 3, 4, 5]
  tail([{a: 1}, {b: 1}, {c: 1}]); // [{b: 1}, {c: 1}]
  tail([true, false, [true, false]]); // [false, [true, false]]
  tail([]); // []
  tail(undefined); // undefined
*/

function tail(arr) {
  return arr != null ? arr.slice(1) : undefined;
}
