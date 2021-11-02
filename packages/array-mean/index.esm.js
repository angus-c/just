var arrayMean = mean;

function mean(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `mean`');
  }

  var sum = 0;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var n = arr[i];
    if (!Number.isFinite(n)) {
      throw new Error('all values passed to `mean` must be numeric');
    }
    sum += n;
  }
  return sum / len;
}

export {arrayMean as default};
