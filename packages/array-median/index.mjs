var arrayMedian = median;

var nonNumericMsg = 'all values passed to `median` must be numeric';

function median(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `median`');
  }
  for (var i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i])) {
      throw new Error(nonNumericMsg);
    }
  }
  if (arr.length == 1) {
    return arr[0];
  }
  var sorted = arr.sort(function(a, b) {
    return a >= b ? 1 : -1;
  });
  var lowerMiddleRank = Math.floor(arr.length / 2);
  return arr.length / 2 != lowerMiddleRank
    ? sorted[lowerMiddleRank]
    : (sorted[lowerMiddleRank] + sorted[lowerMiddleRank - 1]) / 2;
}

export {arrayMedian as default};
