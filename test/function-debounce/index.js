var test = require('../util/test')(__filename);
var debounce = require('../../packages/function-debounce');

test('waits for n ms then runs once', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = debounce(function() {
    callCounter++;
  }, 100);

  for (var i = 0; i < 5; i++) {
    setTimeout(fn, 50);
  }

  setTimeout(function() {
    t.equal(callCounter, 1);
    t.end();
  }, 300);
});

test('when callFirst is true, runs once, waits for n ms then runs again', function(
  t
) {
  t.plan(2);
  var callCounter = 0;
  var fn = debounce(
    function() {
      callCounter++;
    },
    100,
    true
  );

  fn();
  for (var i = 0; i < 5; i++) {
    setTimeout(fn, 50);
  }

  t.equal(callCounter, 1);

  setTimeout(function() {
    t.equal(callCounter, 2);
    t.end();
  }, 300);
});

test('invokes repeatedly when call intervals > than wait time', function(t) {
  t.plan(4);
  var callCounter = 0;
  var fn = debounce(function() {
    callCounter++;
  }, 100);

  var runAndTest = function(expectedCounter) {
    fn();
    t.equal(callCounter, expectedCounter);
  };

  fn();
  setTimeout(function() {
    runAndTest(1);
    setTimeout(function() {
      runAndTest(2);
      setTimeout(function() {
        runAndTest(3);
        setTimeout(function() {
          runAndTest(4);
        }, 200);
      }, 200);
    }, 200);
  }, 200);
});

test('invokes repeatedly when wait is 0', function(t) {
  t.plan(3);
  var callCounter = 0;
  var fn1 = debounce(function() {
    callCounter++;
  }, 0);

  fn1();
  t.equal(callCounter, 1);
  fn1();
  t.equal(callCounter, 2);
  fn1();
  t.equal(callCounter, 3);
});

test('invokes repeatedly when wait is falsey', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn1 = debounce(function() {
    callCounter++;
  });

  fn1();
  fn1();
  fn1();

  setTimeout(function() {
    t.equal(callCounter, 3);
    t.end();
  }, 200);
});
