var test = require('../util/test')(__filename);
var random = require('../../packages/number-random-integer');

function expected(value, start, end) {
  return value >= start && value <= end;
}

test('returns a number between 0 and 1', function(t) {
  t.plan(5);

  t.ok(expected(random(), 0, 1));
  t.ok(expected(random(), 0, 1));
  t.ok(expected(random(), 0, 1));
  t.ok(expected(random(), 0, 1));
  t.ok(expected(random(), 0, 1));

  t.end();
});

test('returns a number between 5 and 10', function(t) {
  t.plan(5);

  t.ok(expected(random(5, 10), 5, 10));
  t.ok(expected(random(5, 10), 5, 10));
  t.ok(expected(random(5, 10), 5, 10));
  t.ok(expected(random(5, 10), 5, 10));
  t.ok(expected(random(5, 10), 5, 10));

  t.end();
});

test('returns a number from 0 to 5', function(t) {
  t.plan(5);

  t.ok(expected(random(5), 0, 5));
  t.ok(expected(random(5), 0, 5));
  t.ok(expected(random(5), 0, 5));
  t.ok(expected(random(5), 0, 5));
  t.ok(expected(random(5), 0, 5));

  t.end();
});

test('invalid', function(t) {
  t.plan(6);

  t.throws(function() {
    random('just');
  });

  t.throws(function() {
    random(5, 'just');
  });

  t.throws(function() {
    random(5, {val: 1, foo: 2});
  });

  t.throws(function() {
    random(5, ['a', 'b']);
  });

  t.throws(function() {
    random(5, null);
  });

  t.throws(function() {
    random(5, function() {});
  });

  t.end();
});
