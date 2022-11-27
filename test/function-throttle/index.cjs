/* eslint-disable max-len */
var test = require('../util/test')(__filename);
var throttle = require('../../packages/function-throttle');

test('by default, runs once at beginning of every n ms - part1', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('by default, runs once at beginning of every n ms - part2', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 160ms, invoked, setTimeout called, will expire at 230ms
        t.equal(callCounter, 3);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is false and trailing is omitted, runs once after every n ms - part 1', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70, {leading: false});

  fn(); // 0ms, setTimeout called, will invoke at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, setTimeout called, will invoke at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 1);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('when leading is false and trailing is omitted, runs once after every n ms - part 2', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70, {leading: false});

  fn(); // 0ms, setTimeout called, will invoke at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, setTimeout called, will invoke at 150ms
      setTimeout(function() {
        fn(); // 160ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is omitted, runs once at beginning of every n ms - part1', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is omitted, runs once at beginning of every n ms - part2', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 160ms, invoked, setTimeout called, will expire at 230ms
        t.equal(callCounter, 3);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is false, runs once at beginning of every n ms - part1', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true, trailing: false}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is false, runs once at beginning of every n ms - part2', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true, trailing: false}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 160ms, invoked, setTimeout called, will expire at 230ms
        t.equal(callCounter, 3);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is false and trailing is true, runs once after every n ms - part 1', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70, {leading: false, trailing: true});

  fn(); // 0ms, setTimeout called, will invoke at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, setTimeout called, will invoke at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 1);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('when leading is false and trailing is true, runs once after every n ms - part 2', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70, {leading: false, trailing: true});

  fn(); // 0ms, setTimeout called, will invoke at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, setTimeout called, will invoke at 150ms
      setTimeout(function() {
        fn(); // 160ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is true, runs once at beginning of every n ms - part1', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true, trailing: true}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 120ms, setTimeout not called
        t.equal(callCounter, 2);
        t.end();
      }, 40);
    }, 40);
  }, 40);
});

test('when leading is true and trailing is true, runs once at beginning of every n ms - part2', function(
  t
) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    70,
    {leading: true, trailing: true}
  );

  fn(); // 0ms, invoked, setTimeout called, will expire at 70ms
  setTimeout(function() {
    fn(); // 40ms, setTimeout not called
    setTimeout(function() {
      fn(); // 80ms, invoked, setTimeout called, will expire at 150ms
      setTimeout(function() {
        fn(); // 160ms, invoked, setTimeout called, will expire at 230ms
        t.equal(callCounter, 3);
        t.end();
      }, 80);
    }, 40);
  }, 40);
});

test('when leading is false and trailing is false, fn never runs', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 70, {leading: false, trailing: false});

  fn();
  setTimeout(function() {
    fn();
    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        t.equal(callCounter, 0);
        t.end();
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
    0
  );

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
});

test('invokes repeatedly when call intervals > than wait time', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    30
  );

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
});

test('invokes repeatedly when wait is falsey', function(t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function() {
      callCounter++;
    },
    NaN
  );

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
});

test('cancel delayed function', function(t) {
  t.plan(1);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: false});

  fn();
  fn();
  fn.cancel();

  setTimeout(function() {
    t.equal(callCounter, 0);
  }, 400);
});

test('cancel delayed function when {leading: true, trailing: false}', function(t) {
  t.plan(1);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: true, trailing: false});

  fn();
  fn();
  fn.cancel();

  setTimeout(function() {
    t.equal(callCounter, 1);
  }, 400);
});

test('cancel delayed function when {leading: true, trailing: true}', function(t) {
  t.plan(1);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: true, trailing: true});

  fn();
  fn();
  fn.cancel();

  setTimeout(function() {
    t.equal(callCounter, 1);
  }, 400);
});

test('flush invokes immediately the callback function', function(t) {
  t.plan(2);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: false});

  fn();
  fn();
  fn.flush();

  t.equal(callCounter, 1);

  setTimeout(function() {
    t.equal(callCounter, 1);
  }, 400);
});

test('flush invokes immediately the callback function when { leading: true }', function(t) {
  t.plan(3);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: true});

  fn();

  t.equal(callCounter, 1);

  fn();
  fn();
  fn.flush();

  t.equal(callCounter, 2);

  setTimeout(function() {
    t.equal(callCounter, 2);
  }, 400);
});

test('flush invokes immediately the callback function when {leading: true, trailing: true}', function(t) {
  t.plan(3);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: true, trailing: true});

  fn();

  t.equal(callCounter, 1);

  fn();
  fn();
  fn.flush();

  t.equal(callCounter, 2);

  setTimeout(function() {
    t.equal(callCounter, 2);
  }, 400);
});

test('flush invokes immediately the callback function when {leading: false, trailing: true}', function(t) {
  t.plan(2);

  var callCounter = 0;
  var fn = throttle(function() {
    callCounter++;
  }, 200, {leading: false, trailing: true});

  fn();
  fn();
  fn.flush();

  t.equal(callCounter, 1);

  setTimeout(function() {
    t.equal(callCounter, 1);
  }, 400);
});
