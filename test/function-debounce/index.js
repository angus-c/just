var test = require('tape');
var debounce = require('../../packages/function-debounce');

test('will not invoke until it has stopped being called for N milliseconds', function (t) {
  t.plan(1);
  var callCounter = 0;
  var myEfficientFunc = debounce(function () {
    callCounter++;
  }, 100);

  for (var i = 0; i < 5; i++) {
    setTimeout(myEfficientFunc, 50);
  }

  setTimeout(function () {
    t.equal(callCounter, 1);
    t.end();
  }, 300);
});

test('will invoke repeatively when called between timeout intervals', function (t) {
  t.plan(1);
  var callCounter = 0;
  var myEfficientFunc = debounce(function () {
    callCounter++;
  }, 0);

  myEfficientFunc();
  myEfficientFunc();
  myEfficientFunc();

  setTimeout(function () {
    t.equal(callCounter, 3);
    t.end();
  }, 200);
});
