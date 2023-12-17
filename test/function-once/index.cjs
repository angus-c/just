var test = require('../util/test')(__filename);
var once = require('../../packages/function-once');

test('requires a function as first argument', function(t) {
  t.plan(3);

  t.throws(function() {
    once(undefined);
  });

  t.throws(function() {
    once({});
  });

  t.equal(typeof once(function() {}), 'function');
});

test('runs only once', function(t) {
  t.plan(2);
  var callCounter = 0;
  var fn = once(function() {
    callCounter++;
  });

  fn();
  t.equal(callCounter, 1);
  fn();
  t.equal(callCounter, 1);
});

test('forwards arguments', function(t) {
  t.plan(2);
  var callCounter = 0;
  var fn = once(function(delta) {
    callCounter += delta;
  });

  fn(2);
  t.equal(callCounter, 2);
  fn(3);
  t.equal(callCounter, 2);
});

test('forwards context', function(t) {
  t.plan(2);
  var callCounter = 0;
  var fn = once(function(delta) {
    callCounter += this;
  });

  fn.call(2);
  t.equal(callCounter, 2);
  fn.call(3);
  t.equal(callCounter, 2);
});
