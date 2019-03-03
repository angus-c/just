module.exports = median;

function median(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `median`');
  }
  var sorted = arr.sort(function(a, b) {
    if (typeof a != 'number') {
      throw new Error('all values passed to `median` must be numeric');
    }
    return a <= b ? 1 : -1;
  }, 0);
  return sorted[Math.round(arr.length / 2) - 1];
}
