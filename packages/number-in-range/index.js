module.exports = inRange;

function inRange(number, start, end) {
  if (typeof number !== 'number') {
    throw new Error('expected a number for first argument');
  }

  if (typeof start !== 'number') {
    throw new Error('expected a number for second argument');
  }

  if (end !== undefined && typeof end !== 'number') {
    throw new Error('expected a number or undefined for third argument');
  }

  var _start = start;
  var _end = end;

  if (arguments.length === 2) {
    _start = 0;
    _end = start;
  }

  return number >= _start && number < _end;
}
