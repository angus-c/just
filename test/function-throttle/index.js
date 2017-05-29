var test = require('tape');
var throttle = require('../../packages/function-throttle');

test('runs once every n ms', function (t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function () {callCounter++;},
    100
  );

  setTimeout(function () {
    console.log(1);
    fn();
    setTimeout(function () {
      console.log(2);
      fn();
      setTimeout(function () {
        console.log(3);
        fn();
        setTimeout(function () {
          console.log(4);
          fn();
          t.equal(callCounter, 2);
          t.end();
        }, 200);
      }, 50);
    }, 50);
  }, 50);
});

test.only('when immediate is true, runs once immediately then once every n ms', function (t) {
  t.plan(1);
  var callCounter = 0;
  var fn = throttle(
    function () {callCounter++;},
    100,
    true
  );

  setTimeout(function () {
    console.log(1);
    fn();
    setTimeout(function () {
      console.log(2);
      fn();
      setTimeout(function () {
        console.log(3);
        fn();
        setTimeout(function () {
          console.log(4);
          fn();
          t.equal(callCounter, 3);
          t.end();
        }, 200);
      }, 60);
    }, 60);
  }, 60);
});
