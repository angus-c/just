module.exports = mean;

function mean(arr) {
  if (!Array.isArray(arr)) {
    arr = [].slice.call(arguments);
  }
  if (!arr.length) {
    throw new Error('no values were passed to `mean`');
  }
  var sum = arr.reduce(function(acc, n) {
    if (typeof n != 'number') {
      throw new Error('all values passed to `mean` must be numeric');
    }
    return acc + n;
  }, 0);
  return sum / arr.length;
}
