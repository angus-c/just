module.exports = percentile;

var nonNumericMsg = 'all values passed to `percentile` must be numeric';

// Using linear interpolation method
// https://en.wikipedia.org/wiki/Percentile

function percentile(arr, percentileValue) {
  if (!Array.isArray(arr)) {
    throw new Error('the argument to `percentile` must be an array');
  }
  if (!arr.length) {
    throw new Error('no values were passed to `percentile`');
  }
  if (arr.length == 1) {
    if (typeof arr[0] == 'number') {
      return arr[0];
    } else {
      throw new Error(nonNumericMsg);
    }
  }
  var sorted = arr.sort(function(a, b) {
    if (typeof a != 'number') {
      throw new Error(nonNumericMsg);
    }
    return a >= b ? 1 : -1;
  });
  var percentileRank = Math.min(
    Math.max((arr.length * percentileValue) / 100 - 0.5, 0),
    arr.length - 1
  );
  var lowerInt = Math.floor(percentileRank);
  if (percentileRank == lowerInt) {
    return sorted[lowerInt];
  } else {
    var upperInt = Math.ceil(percentileRank);
    console.log(lowerInt, upperInt, percentileRank);
    return sorted[lowerInt] + (percentileRank - lowerInt) * (sorted[upperInt] - sorted[lowerInt]);
  }
}
