var test = require('tape');
var random = require('../../packages/array-random');

test('picks array values at random', function (t) {
  t.plan(1);
  var arr = [1, 2, 3, 4, 5];
  var randomChoice = random(arr);
  t.notEqual(arr.indexOf(randomChoice), -1);
  t.end();
});

test('picks sole element when array is of unity length', function (t) {
  t.plan(1);
  var arr = [1];
  var randomChoice = random(arr);
  t.equal(randomChoice, 1);
  t.end();
});

test('undefined or empty input returns undefined', function (t) {
  t.plan(3);
  t.equal(random([]), undefined);
  t.equal(random(), undefined);
  t.equal(random(null), undefined);
  t.end();
});
