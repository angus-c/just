var arrayVariance = variance;

function variance(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length || arr.length < 2) {
    throw new Error('less than one value was passed to `variance`');
  }

  var sum = 0;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    if (!Number.isFinite(n)) {
      throw new Error('all values passed to `variance` must be numeric');
    }
    sum += n;
  }
  var mean = sum / len;

  var acc = 0;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    acc += (n - mean) * (n - mean);
  }
  return acc / (len - 1);
}

export {arrayVariance as default};
