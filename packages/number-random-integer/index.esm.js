var numberRandomInteger = random;

function random(lower, upper) {
  if (lower !== undefined && typeof lower !== 'number') {
    throw new Error('lower should be a number');
  }

  if (upper !== undefined && typeof upper !== 'number') {
    throw new Error('upper should be a number');
  }

  var from = (typeof lower === 'number' ? lower : 1) + 1;
  var end = upper;
  var floor = Math.floor;
  var random = Math.random;

  if (end === undefined) {
    return floor(random() * (from));
  }

  return floor(
    (random() * (end - from)) + from
  );
}

export { numberRandomInteger as default };
