var test = require('../util/test')(__filename);
var values = require('../../packages/object-values');

test('regular objects return array of property values', function(t) {
  t.plan(3);
  t.deepEqual(values({a: 4, c: 8}), [4, 8]);
  t.deepEqual(values({a: {aa: 2}, b: {bb: 4}}), [{aa: 2}, {bb: 4}]);
  t.deepEqual(values({}), []);
  t.end();
});

test('array returns a copy of itself', function(t) {
  t.plan(4);
  var arr1 = [1, 2, 3];
  t.deepEqual(values(arr1), arr1);
  t.notEqual(values(arr1), arr1);
  var arr2 = [];
  t.deepEqual(values(arr2), arr2);
  t.notEqual(values(arr2), arr2);
  t.end();
});

test('irregular objects return array of property values', function(t) {
  t.plan(3);
  t.deepEqual(
    values(function(a, b) {
      return a + b;
    }),
    []
  );
  t.deepEqual(values(new String('hello')), ['h', 'e', 'l', 'l', 'o']);
  var fn = function() {};
  fn.a = 4;
  t.deepEqual(values(fn), [4]);
  t.end();
});

test('primitives throw exceptions', function(t) {
  t.plan(4);
  t.throws(function() {
    values(1);
  }, Error);
  t.throws(function() {
    values(true);
  }, Error);
  t.throws(function() {
    values(undefined);
  }, Error);
  t.throws(function() {
    values(null);
  }, Error);
});
