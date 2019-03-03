module.exports = median;

function median(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `median`');
  }
  if (arr.length == 1) {
    if (typeof arr[1] === 'number') {
      return arr[1];
    } else {
      throw new Error('all values passed to `median` must be numeric');
    }
  }
  var sorted = arr.sort(function(a, b) {
    if (typeof a != 'number') {
      throw new Error('all values passed to `median` must be numeric');
    }
    return a <= b ? 1 : -1;
  }, 0);
  var lowerMiddleRank = Math.floor(arr.length / 2);
  return arr.length / 2 != lowerMiddleRank
    ? sorted[lowerMiddleRank]
    : (sorted[lowerMiddleRank] + sorted[lowerMiddleRank - 1]) / 2;
}
