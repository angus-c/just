var test = require('../util/test')(__filename);
var compare = require('../../packages/collection-compare');

test('strictly equal primitives return true', function(t) {
  t.plan(5);
  t.ok(compare(3, 3));
  t.ok(compare('3', '3'));
  t.ok(compare(true, true));
  t.ok(compare(null, null));
  t.ok(compare(undefined, undefined));
  t.end();
});

test('not strictly equal primitives return false', function(t) {
  t.plan(5);
  t.notOk(compare(3, 4));
  t.notOk(compare('3', '4'));
  t.notOk(compare(true, false));
  t.notOk(compare(null, undefined));
  t.notOk(compare(undefined, null));
  t.end();
});

test('two NaN values return true', function(t) {
  t.plan(1);
  t.ok(compare(NaN, NaN));
  t.end();
});

test('alike arrays return true', function(t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3, 4];
  t.ok(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 4], 5];
  t.ok(compare(value3, value4));
  t.end();
});

test('unalike arrays return false', function(t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3];
  t.notOk(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 3], 5];
  t.notOk(compare(value3, value4));
  t.end();
});

test('alike simple objects return true', function(t) {
  t.plan(3);
  var value1 = {a: 4, b: 3};
  var value2 = {a: 4, b: 3};
  t.ok(compare(value1, value2));
  var value3 = {a: 4, b: 3};
  var value4 = {a: 4, b: 2 + 1};
  t.ok(compare(value3, value4));
  var value5 = {a: 4, b: 3};
  var value6 = {b: 2 + 1, a: 4};
  t.ok(compare(value5, value6));
  t.end();
});

test('unalike simple objects return false', function(t) {
  t.plan(4);
  var value1 = {a: 4, b: 4};
  var value2 = {a: 4, b: 3};
  t.notOk(compare(value1, value2));
  var value3 = {a: 4, b: 4};
  var value4 = {a: 4, b: 4, c: 5};
  t.notOk(compare(value3, value4));
  var value5 = {a: 4, b: 3};
  var value6 = {a: 4, b: 2 + 2};
  t.notOk(compare(value5, value6));
  var value7 = {a: 4, b: 3};
  var value8 = {b: 2 + 2, a: 4};
  t.notOk(compare(value7, value8));
  t.end();
});

test('alike complex objects return true', function(t) {
  t.plan(3);
  var value1 = {a: [4, 2], b: 3};
  var value2 = {a: [4, 2], b: 3};
  t.ok(compare(value1, value2));
  var value3 = {a: {c: 5, d: [1, 2, 3]}, b: /44/};
  var value4 = {a: {c: 5, d: [1, 4 / 2, 3]}, b: /44/};
  t.ok(compare(value3, value4));
  var value5 = [1, 2, [{a: 5, b: '*', c: 9}], false, [1, [2, 3]]];
  var value6 = [1, 2, [{b: '*', c: 9, a: 5}], false, [1, [2, 3]]];
  t.ok(compare(value5, value6));
  t.end();
});

test('unalike complex objects return false', function(t) {
  t.plan(3);
  var value1 = {a: [4, 2], b: 3};
  var value2 = {a: [4, 2], c: 3};
  t.notOk(compare(value1, value2));
  var value3 = {a: {c: 5, d: [1, 2, 3]}, b: /44/};
  var value4 = {a: {c: 5, d: [1, 4 / 2, 3]}, b: /44/, e: 5};
  t.notOk(compare(value3, value4));
  var value5 = [1, 2, [{a: 5, b: '*', c: 9}], false, [1, [2, 3]]];
  var value6 = [1, 2, [{b: '?', c: 9, a: 5}], false, [1, [2, 3]]];
  t.notOk(compare(value5, value6));
  t.end();
});

test('alike functions return true', function(t) {
  t.plan(3);
  t.ok(compare(function() {}, function() {}));
  t.ok(
    compare(
      function(a, b) {
        return a + b;
      },
      function(a, b) {
        return a + b;
      }
    )
  );
  t.ok(compare([].slice, [].slice));
  t.end();
});

test('unalike functions return false', function(t) {
  t.plan(3);
  t.notOk(compare(function() {}, function(a) {}));
  t.notOk(
    compare(
      function(a, b) {
        return a + b;
      },
      function(a, b) {
        return a - b;
      }
    )
  );
  t.notOk(compare([].slice, [].splice));
  t.end();
});

test('alike sets return true', function(t) {
  t.plan(4);
  t.ok(compare(new Set(), new Set()));
  t.ok(compare(new Set(), new Set([])));
  t.ok(compare(new Set([1, 2]), new Set([1, 2])));
  t.ok(compare({a: 'hi', aSet: new Set([1, 2])}, {a: 'hi', aSet: new Set([1, 2])}));
  t.end();
});

test('unalike sets return false', function(t) {
  t.plan(3);
  t.notOk(compare(new Set([1, 2]), new Set([3, 4])));
  t.notOk(compare(new Set([1, 2]), new Set([1, 2, 3])));
  t.notOk(compare({a: 'hi', aSet: new Set([1, 2])}, {a: 'hi', aSet: new Set([3, 4])}));
  t.end();
});

test('alike regexps return true', function(t) {
  t.plan(1);
  t.ok(compare(/hello/, /hello/));
  t.end();
});

test('unalike regexps return false', function(t) {
  t.plan(1);
  t.notOk(compare(/hello/, /hello/g));
  t.end();
});

test('alike dates return true', function(t) {
  t.plan(1);
  t.ok(compare(new Date(2016, 8, 3), new Date(2016, 8, 3)));
  t.end();
});

test('unalike dates return false', function(t) {
  t.plan(1);
  t.notOk(compare(new Date(2016, 8, 3), new Date(2016, 8, 3, 16)));
  t.end();
});

// https://github.com/angus-c/just/issues/98
test('unalike complex objects do not crash when objects/arrays become null', function(t) {
  t.plan(2);
  var value1 = {a: [4, 2], b: 3};
  var value2 = {a: null, c: 3};
  t.notOk(compare(value1, value2));
  var value3 = {a: {a: 1}, b: 3};
  var value4 = {a: null, c: 3};
  t.notOk(compare(value3, value4));
  t.end();
});

// https://github.com/angus-c/just/issues/423
test('primitives compared with primitive wrappers return false', function(t) {
  t.plan(2);
  var value1 = 42;
  var value2 = new Number(42);
  t.notOk(compare(value1, value2));
  t.notOk(compare(value2, value1));
  t.end();
});
