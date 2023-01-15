var test = require('tape');
var entries = require('../../packages/object-entries');

test('regular objects return pairs of property/value', function(t) {
  t.plan(3);
  t.deepEqual(entries({c: 8, a: 4}), [['c', 8], ['a', 4]]);
  t.deepEqual(entries({b: {bb: 4}, a: {aa: 2}}), [
    ['b', {bb: 4}],
    ['a', {aa: 2}],
  ]);
  t.deepEqual(entries({}), []);
  t.end();
});

test('arrays return pairs of index/value', function(t) {
  t.plan(3);
  t.deepEqual(entries([{c: 8}, {a: 4}]), [
    ['0', {c: 8}],
    ['1', {a: 4}],
  ]);
  t.deepEqual(entries([]), []);
  t.notEqual(entries([]), []);
  t.end();
});

test('irregular objects return pairs of property/value', function(t) {
  t.plan(3);
  t.deepEqual(entries(new String('hello')), [
    ['0', 'h'],
    ['1', 'e'],
    ['2', 'l'],
    ['3', 'l'],
    ['4', 'o'],
  ]);
  t.deepEqual(
    entries(function(a, b) {
      return a + b;
    }),
    []
  );
  var fn = function() {};
  fn.a = 4;
  t.deepEqual(entries(fn), [['a', 4]]);
  t.end();
});

test('primitives throw exceptions', function(t) {
  t.plan(4);
  t.throws(
    function() {
      entries(1);
    },
    Error,
    'number'
  );
  t.throws(
    function() {
      entries(true);
    },
    Error,
    'boolean'
  );
  t.throws(
    function() {
      entries(undefined);
    },
    Error,
    'undefined'
  );
  t.throws(
    function() {
      entries(null);
    },
    Error,
    'null'
  );
});
