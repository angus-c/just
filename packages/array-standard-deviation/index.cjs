module.exports = stdev;

function stdev(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length || arr.length < 2) {
    throw new Error('less than one value was passed to `standard deviation`');
  }

  var sum = 0;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    if (!Number.isFinite(n)) {
      throw new Error(
        'all values passed to `standard deviation` must be numeric'
      );
    }
    sum += n;
  }
  var mean = sum / len;

  var acc = 0;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    acc += (n - mean) * (n - mean);
  }
  return Math.sqrt(acc / (len - 1));
}
