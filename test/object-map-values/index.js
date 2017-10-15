var test = require('../util/test')(__filename);
var map = require('../../packages/object-map-values');
var compare = require('../../packages/collection-compare');

test('applies predicate based on value argument', function(t) {
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

test('additional arguments are undefined', function(t) {
  t.plan(3);
  var obj1 = {a: 3, b: 5, c: 9};
  var result1 = map(obj1, function(value) {
    return value + 1;
  });
  t.ok(compare(result1, {a: 4, b: 6, c: 10}));
  var result2 = map(obj1, function(value, key) {
    return key;
  });
  t.ok(compare(result2, {a: undefined, b: undefined, c: undefined}));
  var result3 = map(obj1, function(value, key, i) {
    return i;
  });
  t.ok(compare(result3, {a: undefined, b: undefined, c: undefined}));
});
