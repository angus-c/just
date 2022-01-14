module.exports = percentile;

var numericError = 'all values passed to percentile must be numeric';

// Percentile (Exlusive) from the nist spec
function percentile(arr, percentage) {
  if (!Array.isArray(arr)) {
    throw new Error('the first argument to percentile must be an array');
  }
  if (percentage < 0 || percentage > 1) {
    throw new Error('The percent must be between 0 and 1');
  }
  if (!arr.length) {
    throw new Error('no values were passed to percentile');
  }
  //sort doesnt call if length is one. need to check explicitly.
  if (arr.length === 1 && !Number.isFinite(arr[0])) {
    throw new Error(numericError);
  }
  var sorted = arr.sort(function(a, b) {
    if (!Number.isFinite(a)) {
      throw new Error(numericError);
    }
    return a - b;
  });

  var rank = percentage * (arr.length - 1) + 1;
  var rankInt = Math.floor(rank);
  var rankFrac = rank - rankInt;

  if(rank === 0) {
    return arr[0];
  }
  if(rank >= arr.length) {
    return arr[arr.length - 1];
  }

  var upper = sorted[rankInt];
  var lower = sorted[rankInt - 1];
  return (lower + rankFrac * (upper - lower));
}
