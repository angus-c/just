var test = require('../util/test')(__filename);
var random = require('../../packages/array-random');

test('picks array values at random', function(t) {
  t.plan(1);
  var arr = [1, 2, 3, 4, 5];
  var randomChoice = random(arr);
  t.notEqual(arr.indexOf(randomChoice), -1);
  t.end();
});

test('picks sole element when array is of unity length', function(t) {
  t.plan(1);
  var arr = [1];
  var randomChoice = random(arr);
  t.equal(randomChoice, 1);
  t.end();
});

test('non-array arguments throw', function(t) {
  t.plan(4);
  t.throws(function() {
    random({});
  });
  t.throws(function() {
    random(undefined);
  });
  t.throws(function() {
    random(null);
  });
  t.throws(function() {
    random();
  });
  t.end();
});
