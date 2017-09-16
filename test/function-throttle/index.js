var test = require('../util/test')(__filename);
var throttle = require('../../packages/function-throttle');

test('runs once after every n ms - part 1', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70);

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 1);
          t.end();
        }, 40);
      }, 40);
    }, 40);
  }, 40);
});

test('runs once after every n ms - part 2', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70);

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 2);
          t.end();
        }, 100);
      }, 40);
    }, 40);
  }, 40);
});

test('when callFirst is true, runs once at beginning of every n ms - part1', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    true
  );

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 2);
          t.end();
        }, 40);
      }, 40);
    }, 40);
  }, 40);
});

test('when callFirst is true, runs once at beginning of every n ms - part2', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    true
  );

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 3);
          t.end();
        }, 200);
      }, 40);
    }, 40);
  }, 40);
});

test('invokes repeatedly when wait is 0', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    0,
    true
  );

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 4);
          t.end();
        }, 40);
      }, 40);
    }, 40);
  }, 40);
});

test('invokes repeatedly when call intervals > than wait time', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    30,
    true
  );

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 4);
          t.end();
        }, 40);
      }, 40);
    }, 40);
  }, 40);
});

test('invokes repeatedly when wait is falsey', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    NaN,
    true
  );

  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          t.equal(callCounter, 4);
          t.end();
        }, 40);
      }, 40);
    }, 40);
  }, 40);
});
