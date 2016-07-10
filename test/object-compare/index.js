var test = require('tape');
var compare = require('../../packages/object-compare');

test('strictly equal primitives return true', function (t) {
  t.plan(5);
  t.ok(compare(3, 3));
  t.ok(compare('3', '3'));
  t.ok(compare(true, true));
  t.ok(compare(null, null));
  t.ok(compare(undefined, undefined));
  t.end();
});

test('not strictly equal primitives return true', function (t) {
  t.plan(5);
  t.notOk(compare(3, 4));
  t.notOk(compare('3', '4'));
  t.notOk(compare(true, false));
  t.notOk(compare(null, undefined));
  t.notOk(compare(undefined, null));
  t.end();
});

test('alike function return true', function (t) {
  t.plan(3);
  t.ok(compare(function () {}, function () {}));
  t.ok(compare(function (a, b) {return a + b;}, function (a, b) {return a + b;}));
  t.ok(compare([].slice, [].slice));
  t.end();
});

test('alike function return true', function (t) {
  t.plan(3);
  t.notOk(compare(function () {}, function (a) {}));
  t.notOk(compare(function (a, b) {return a + b;}, function (a, b) {return a - b;}));
  t.notOk(compare([].slice, [].splice));
  t.end();
});

test('unalike arrays return false', function (t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3];
  t.notOk(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 3], 5];
  t.notOk(compare(value3, value4));
  t.end();
});

test('alike arrays return true', function (t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3, 4];
  t.ok(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 4], 5];
  t.ok(compare(value3, value4));
  t.end();
});

test('unalike arrays return false', function (t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3];
  t.notOk(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 3], 5];
  t.notOk(compare(value3, value4));
  t.end();
});

test('alike simple objects return true', function (t) {
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

test('unalike simple objects return false', function (t) {
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

test('alike complex objects return true', function (t) {
  t.plan(3);
  var value1 = {a: [4, 2], b: 3};
  var value2 = {a: [4, 2], b: 3};
  t.ok(compare(value1, value2));
  var value3 = {a: {c: 5, d: [1, 2, 3]}, b: 3};
  var value4 = {a: {c: 5, d: [1, 4 / 2, 3]}, b: 2 + 1};
  t.ok(compare(value3, value4));
  var value5 = [1, 2, [{a: 5, b: '*', c: 9}], false, [1, [2, 3]]];
  var value6 = [1, 2, [{b: '*', c: 9, a: 5}], false, [1, [2, 3]]];
  t.ok(compare(value5, value6));
  t.end();
});

test('unalike complex objects return false', function (t) {
  t.plan(3);
  var value1 = {a: [4, 2], b: 3};
  var value2 = {a: [4, 2], c: 3};
  t.notOk(compare(value1, value2));
  var value3 = {a: {c: 5, d: [1, 2, 3]}, b: 3};
  var value4 = {a: {c: 5, d: [1, 4 / 2, 3]}, b: 2 + 1, e: 5};
  t.notOk(compare(value3, value4));
  var value5 = [1, 2, [{a: 5, b: '*', c: 9}], false, [1, [2, 3]]];
  var value6 = [1, 2, [{b: '?', c: 9, a: 5}], false, [1, [2, 3]]];
  t.notOk(compare(value5, value6));
  t.end();
});
