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

test('cancel debounced function', function(t) {
  t.plan(1);

  var callCounter = 0;
  var fn = debounce(function() {
    callCounter++;
  }, 200);

  fn();
  fn();
  fn.cancel();

  setTimeout(function() {
    t.equal(callCounter, 0);
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

test('cancel debounced function when callFirst is true', function(t) {
  t.plan(1);

  var callCounter = 0;
  var fn = debounce(function() {
    callCounter++;
  }, 200, true);

  fn();
  fn();
  fn.cancel();

  setTimeout(function() {
    t.equal(callCounter, 1);
    t.end();
  }, 300);
});

test('immediately invoke debounced function', function(t) {
  t.plan(3);

  var params = {};
  var callCounter = 0;
  var fn = debounce(function(param1, param2) {
    params.param1 = param1;
    params.param2 = param2,

    callCounter++;
  }, 200);

  fn('js', 'ts');
  fn.flush();

  t.equal(callCounter, 1);
  t.deepEqual(params, {param1: 'js', param2: 'ts'});

  setTimeout(function() {
    t.equal(callCounter, 1);
    t.end();
  }, 300);
});

test('immediately invoke debounced function when callFirst = true', function(t) {
  t.plan(3);

  var params = {};
  var callCounter = 0;
  var fn = debounce(function(param1, param2) {
    params.param1 = param1;
    params.param2 = param2,

    callCounter++;
  }, 200, true);

  fn('js', 'ts');
  fn.flush();

  t.equal(callCounter, 2);
  t.deepEqual(params, {param1: 'js', param2: 'ts'});

  setTimeout(function() {
    t.equal(callCounter, 2);
    t.end();
  }, 300);
});

test('should not run the debounced function if cancel was invoked before the flush', function(t) {
  t.plan(2);

  var callCounter = 0;
  var fn = debounce(function() {
    callCounter++;
  }, 200);

  fn();
  fn.cancel();
  fn.flush();

  t.equal(callCounter, 0);

  setTimeout(function() {
    t.equal(callCounter, 0);
    t.end();
  }, 300);
});

test('debounced function runs once if cancel was invoked before flush and callFirst = true',
  function(t) {
    t.plan(2);

    var callCounter = 0;
    var fn = debounce(function() {
      callCounter++;
    }, 200, true);

    fn();
    fn.cancel();
    fn.flush();

    t.equal(callCounter, 1);

    setTimeout(function() {
      t.equal(callCounter, 1);
      t.end();
    }, 300);
  });
