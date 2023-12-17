var test = require('../util/test')(__filename);
var inRange = require('../../packages/number-in-range');

test('throws if first argument is not a number', function(t) {
  t.plan(6);

  t.throws(function() {
    inRange();
  });

  t.throws(function() {
    inRange('a', 1);
  });

  t.throws(function() {
    inRange(function() {}, 1);
  });

  t.throws(function() {
    inRange(null, 1, 10);
  });

  t.throws(function() {
    inRange({}, 1, 10);
  });

  t.throws(function() {
    inRange([], 1, 10);
  });
});

test('throws if second argument is not a number', function(t) {
  t.plan(6);

  t.throws(function() {
    inRange(1);
  });

  t.throws(function() {
    inRange(1, 'a');
  });

  t.throws(function() {
    inRange(1, function() {});
  });

  t.throws(function() {
    inRange(1, null, 10);
  });

  t.throws(function() {
    inRange(1, {}, 10);
  });

  t.throws(function() {
    inRange(1, [], 10);
  });
});

test('throws if third argument is not a number or undefined', function(t) {
  t.plan(5);

  t.throws(function() {
    inRange(1, 1, 'a');
  });

  t.throws(function() {
    inRange(1, 2, function() {});
  });

  t.throws(function() {
    inRange(1, 2, {});
  });

  t.throws(function() {
    inRange(1, 10, []);
  });

  t.throws(function() {
    inRange(1, 10, null);
  });
});

test('number should be between start and up to end', function(t) {
  t.plan(6);

  t.ok(inRange(1, 0, 10));
  t.ok(inRange(0, 0, 10));
  t.ok(inRange(9, 0, 10));
  t.ok(!inRange(10, 0, 10));
  t.ok(!inRange(11, 0, 10));
  t.ok(!inRange(1, 2, 10));
});

test('in case last parameter is omitted, the initial number is zero', function(t) {
  t.plan(6);

  t.ok(inRange(1, 10));
  t.ok(inRange(5, 10));
  t.ok(inRange(9, 10));
  t.ok(!inRange(-1, 10));
  t.ok(!inRange(10, 10));
  t.ok(!inRange(11, 10));
});
