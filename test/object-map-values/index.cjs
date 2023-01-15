var test = require('../util/test')(__filename);
var map = require('../../packages/object-map-values');
var compare = require('../../packages/collection-compare');

test('applies predicate using value argument', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value) {
    return value + 1;
  });
  t.ok(compare(result1, {a: 4, b: 6, c: 10}));
  var obj2 = {a: 3, b: 0, c: null};
  var result2 = map(obj2, function(value) {
    return Boolean(value);
  });
  t.ok(compare(result2, {a: true, b: false, c: false}));
  t.end();
});

test('applies predicate using key argument', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key) {
    return key;
  });
  t.ok(compare(result1, {a: 'a', b: 'b', c: 'c'}));
  var obj2 = [1, 2, 3];
  var result2 = map(obj2, function(value, key) {
    return Boolean(Number(key)) || key;
  });
  t.ok(compare(result2, {0: '0', 1: true, 2: true}));
});

test('applies predicate using value and key arguments', function(t) {
  t.plan(1);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key) {
    return key + value;
  });
  t.ok(compare(result1, {a: 'a3', b: 'b5', c: 'c9'}));
});

test('applies predicate using all arguments', function(t) {
  t.plan(1);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key, obj) {
    return obj['b'] + value + key;
  });
  t.ok(compare(result1, {a: '8a', b: '10b', c: '14c'}));
});
