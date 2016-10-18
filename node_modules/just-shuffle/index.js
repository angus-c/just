module.exports = shuffle;

/*
  shuffle([1, 2, 3]); // array with original elements randomly sorted
  shuffle([1]); // [1]
  shuffle(); // undefined
  shuffle(undefined); // undefined
  shuffle(null); // undefined
  shuffle({}); // undefined
*/

function shuffle(arr) {
  if (!arr || !('length' in arr)) {
    return undefined;
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
