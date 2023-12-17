module.exports = shuffle;

/*
  shuffle([1, 2, 3]);
  // array with original elements randomly sorted
  shuffle([1, 2, 3], {shuffleAll: true});
  // array with original elements randomly sorted and all in a new position
  shuffle([1]); // [1]
  shuffle(); // throws
  shuffle(undefined); // throws
  shuffle(null); // throws
  shuffle({}); // throws
*/

function shuffle(arr, options) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  if (arr.length < 2) {
    return arr;
  }
  var shuffleAll = options && options.shuffleAll;
  var result = arr.slice();
  var i = arr.length, rand, temp;
  while (--i > 0) {
    do {
      rand = Math.floor(Math.random() * (i + 1));
    } while (shuffleAll && rand == i);
    if (!shuffleAll || rand != i) {
      temp = result[i];
      result[i] = result[rand];
      result[rand] = temp;
    }
  }
  return result;
}
