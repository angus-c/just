module.exports = random;

// function random(lower, upper) {
//   if (lower !== undefined && typeof lower !== 'number') {
//     throw new Error('lower should be a number');
//   }

//   if (upper !== undefined && typeof upper !== 'number') {
//     throw new Error('upper should be a number');
//   }

//   var from = (typeof lower === 'number' ? lower : 1) + 1;
//   var end = upper;
//   var floor = Math.floor;
//   var random = Math.random;

//   if (end === undefined) {
//     return floor(random() * (from));
//   }

//   return floor(
//     (random() * (end - from)) + from
//   );
// }

function random(n1, n2) {
  if (typeof n1 == 'undefined') {
    n1 = 1;
  }
  if (typeof n2 == 'undefined') {
    n2 = 0;
  }
  if (typeof n1 != 'number' || typeof n2 !== 'number') {
    throw new Error('just-random: arguments must be numbers');
  }
  if (n1 > n2) {
    let temp = n1;
    n1 = n2;
    n2 = temp;
  }

  console.log('******', n1, n2);
  return ~~(Math.random() * (trunc(n2) + 1 - trunc(n1))) + trunc(n1);
}

function trunc(n) {
  return Math.trunc ? Math.trunc(n) : Math.floor(n) + (n < 0 ? 1 : 0);
}
