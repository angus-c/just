var test = require('../util/test')(__filename);
var map = require('../../packages/object-map-keys');
var compare = require('../../packages/collection-compare');

/*
map({a: 'cow', b: 'sheep', c: 'pig'}, (value) => value);
  // {cow: 'cow', sheep: 'sheep', pig: pig'}
map([4, 5, 6], (value, key) => key + 1); // {1: 4, 2: 5, 3: 6}
map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
map({a: 3, b: 5, c: 9}, (value, key, object) => key + object.b);
  // {a5: 3, b5: 5, c5: 9}
*/

test('applies predicate using value argument', function(t) {
  t.plan(2);
  var obj1 = {a: 'cow', b: 'sheep', c: 'pig'};
  var result1 = map(obj1, function(value) {
    return value;
  });
  t.ok(compare(result1, {cow: 'cow', sheep: 'sheep', pig: 'pig'}));
  var obj2 = {a: 3, b: 0, c: null};
  var result2 = map(obj2, function(value) {
    return Boolean(value);
  });
  t.ok(compare(result2, {true: 3, false: null}));
  t.end();
});

test('applies predicate using key argument', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key) {
    return key + 1;
  });
  t.ok(compare(result1, {a1: 3, b1: 5, c1: 9}));
  var obj2 = [1, 2, 3];
  var result2 = map(obj2, function(value, key) {
    return Number(key) + 1;
  });
  t.ok(compare(result2, {1: 1, 2: 2, 3: 3}));
  t.end();
});

test('applies predicate using value and key arguments', function(t) {
  t.plan(1);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key) {
    return key + value;
  });
  t.ok(compare(result1, {a3: 3, b5: 5, c9: 9}));
});

test('applies predicate using all arguments', function(t) {
  t.plan(1);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value, key, obj) {
    return obj['b'] + value + key;
  });
  t.ok(compare(result1, {'8a': 3, '10b': 5, '14c': 9}));
});
