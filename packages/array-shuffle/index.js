module.exports = shuffle;

/*
  shuffle([1, 2, 3]); // array with original elements randomly sorted
  shuffle([1]); // [1]
  shuffle(); // throws
  shuffle(undefined); // throws
  shuffle(null); // throws
  shuffle({}); // throws
*/

function shuffle(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  var len = arr.length;
  var result = Array(len);
  for (var i = 0, rand; i < len; i++) {
    rand = Math.floor(Math.random() * i);
    if (rand != i) {
      result[i] = result[rand];
    }
    result[rand] = arr[i];
  }
  return result;
}
