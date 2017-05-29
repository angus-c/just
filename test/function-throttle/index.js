var test = require('tape');
var throttle = require('../../packages/function-throttle');

test.only('runs once every n ms', function (t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function () {callCounter++;},
    100
  );

  setTimeout(function () {
    fn();
    setTimeout(function () {
      fn();
      setTimeout(function () {
        fn();
        setTimeout(function () {
          fn();
          t.equal(callCounter, 2);
          t.end();
        }, 80);
      }, 80);
    }, 80);
  }, 80);
});

// test.only('when immediate is true, runs once immediately then once every n ms', function (t) {
// });
