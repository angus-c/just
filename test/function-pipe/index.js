var test = require('../util/test')(__filename);
var pipe = require('../../packages/function-pipe');
var camelCase = require('../../packages/string-camel-case');
var last = require('../../packages/array-last');

test('Correctly pipes value through one or more functions', function(t) {
  t.plan(3);
  t.equal(pipe('hello world', camelCase), 'helloWorld');

  function addOne(a) {
    return a + 1;
  }
  function double(b) {
    return b * 2;
  }
  t.equal(pipe(3, addOne, double), 8);

  function prependZero(arr) {
    return [0, ...arr];
  }
  function reverse(arr) {
    return [...arr].reverse();
  }

  t.equal(pipe([1, 2, 3], prependZero, reverse, last), 0);
  t.end();
});

test('Throws if only give 0 or 1 parameters', function(t) {
  t.plan(2);
  t.throws(function() {
    pipe();
  }, Error);
  t.throws(function() {
    pipe(5);
  }, Error);
  t.end();
});
