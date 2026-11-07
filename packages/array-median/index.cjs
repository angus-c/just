module.exports = median;

var nonNumericMsg = 'all values passed to `median` must be numeric';

function median(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `median`');
  }
  if (arr.length == 1) {
    if (Number.isFinite(arr[0])) {
      return arr[0];
    } else {
      throw new Error(nonNumericMsg);
    }
  }
  var sorted = arr.sort(function(a, b) {
    if (!Number.isFinite(a)) {
      throw new Error(nonNumericMsg);
    }
    return a >= b ? 1 : -1;
  });
  var lowerMiddleRank = Math.floor(arr.length / 2);
  if (arr.length / 2 != lowerMiddleRank) {
    return sorted[lowerMiddleRank];
  }
  var upper = sorted[lowerMiddleRank];
  var lower = sorted[lowerMiddleRank - 1];
  var sum = upper + lower;
  return !Number.isFinite(sum) && Number.isFinite(upper) && Number.isFinite(lower)
    ? upper / 2 + lower / 2
    : sum / 2;
}
