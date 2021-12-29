module.exports = random;

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

  return ~~(Math.random() * (trunc(n2) + 1 - trunc(n1))) + trunc(n1);
}

function trunc(n) {
  return Math.trunc ? Math.trunc(n) : Math.floor(n) + (n < 0 ? 1 : 0);
}
