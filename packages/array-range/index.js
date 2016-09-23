module.exports = range;

/*
  range(0, 5); // [0, 1, 2, 3, 4]
  range(5); // [0, 1, 2, 3, 4]
  range(-5); // [0, -1, -2, -3, -4]
  range(0, 20, 5) // [0, 5, 10, 15]
  range(0, -20, -5) // [0, -5, -10, -15]
*/

function range(start, stop, step) {
  if (typeof stop === 'undefined') {
    stop = start || 0;
    start = 0;
  }
  if (typeof step === 'undefined') {
    step = stop > start ? 1 : -1;
  }
  var toReturn = [];
  if (start < stop) {
    for (; start < stop; start += step) {
      toReturn.push(start);
    }
  } else {
    for (; start > stop; start += step) {
      toReturn.push(start);
    }
  }
  return toReturn;
}
