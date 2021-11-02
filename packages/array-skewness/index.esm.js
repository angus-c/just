var arraySkewness = skewness;

function skewness(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length || arr.length < 2) {
    throw new Error('less than one value was passed to `skewness`');
  }

  var standardDeviation, mean, median;

  // standard deviation
  var sum = 0;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    if (!Number.isFinite(n)) {
      throw new Error('all values passed to `skewness` must be numeric');
    }
    sum += n;
  }
  mean = sum / len;

  var acc = 0;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    acc += (n - mean) * (n - mean);
  }
  standardDeviation = Math.sqrt(acc / (len - 1));

  // median
  if (arr.length == 1) {
    median = arr[0];
  }
  var sorted = arr.sort(function(a, b) {
    return a >= b ? 1 : -1;
  });
  var lowerMiddleRank = Math.floor(arr.length / 2);
  median =
    arr.length / 2 != lowerMiddleRank
      ? sorted[lowerMiddleRank]
      : (sorted[lowerMiddleRank] + sorted[lowerMiddleRank - 1]) / 2;

  // Pearson's second skewness coefficient (median skewness)
  return (3 * (mean - median)) / standardDeviation;
}

export {arraySkewness as default};
