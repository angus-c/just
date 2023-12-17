var test = require('../util/test')(__filename);
var map = require('../../packages/object-map');
var compare = require('../../packages/collection-compare');

test('use value', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(key, value) {
    return value + 1;
  });
  t.ok(compare(result1, {a: 4, b: 6, c: 10}));
  var obj2 = {a: 3, b: 5, c: null};
  var result2 = map(obj2, function(key, value) {
    return Boolean(value);
  });
  t.ok(compare(result2, {a: true, b: true, c: false}));
  t.end();
});

test('use key', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(key, value) {
    return key;
  });
  t.ok(compare(result1, {a: 'a', b: 'b', c: 'c'}));
  var obj2 = {'1': 3, '2': 5, '3': 9};
  var result2 = map(obj2, Number);
  t.ok(compare(result2, {'1': 1, '2': 2, '3': 3}));
  t.end();
});

test('use key and value', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(key, value) {
    return key + value;
  });
  t.ok(compare(result1, {a: 'a3', b: 'b5', c: 'c9'}));
  var obj2 = {'1': 3, '2': 5, '3': 9};
  var result2 = map(obj2, function(key, value) {
    return value - key;
  });
  t.ok(compare(result2, {'1': 2, '2': 3, '3': 6}));
  t.end();
});
