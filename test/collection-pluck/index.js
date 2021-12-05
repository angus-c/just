var test = require('../util/test')(__filename);
var pluck = require('../../packages/collection-pluck');
var compare = require('../../packages/collection-compare');

test('arrays return array of values at propertyName', function(t) {
  t.plan(2);
  var arr = [{a: 1, b: 2}, {a: 4, b: 3}, {a: 2, b: 5}];
  t.ok(compare(pluck(arr, 'a'), [1, 4, 2]));
  var arr2 = [{a: 1, b: [3, 4, 5]}, {a: 4, b: /23/}, {a: 2, b: {r: 4}}];
  t.ok(compare(pluck(arr2, 'b'), [[3, 4, 5], /23/, {r: 4}]));
  t.end();
});

test('objects return object with original keys and values at propertyName', function(
  t
) {
  t.plan(2);
  var obj = {x: {a: 1, b: 2}, y: {a: 4, b: 3}, z: {a: 2, b: 5}};
  t.ok(compare(pluck(obj, 'a'), {x: 1, y: 4, z: 2}));
  var obj2 = {x: {a: 1, b: [22]}, y: {a: 4}, z: {a: 2, b: '14'}};
  t.ok(compare(pluck(obj2, 'b'), {x: [22], y: undefined, z: '14'}));
  t.end();
});

test('empty object returns empty object', function(t) {
  t.plan(1);
  t.ok(compare(pluck({}, 'a'), {}));
  t.end();
});

test('empty array returns empty array', function(t) {
  t.plan(1);
  t.ok(compare(pluck([], 'a'), []));
  t.end();
});

test('arrays of arrays work fine with numeric propertyName', function(t) {
  t.plan(2);
  var arr = [['a', 0], [100, 1, 'xyz'], [{}, 4]];
  t.ok(compare(pluck(arr, 1), [0, 1, 4]));
  var arr2 = [['a', [5, 6, 7], {}], [/45/, {}], [[], {a: 100}]];
  t.ok(compare(pluck(arr2, 0), ['a', /45/, []]));
  t.end();
});

test('objects of arrays work fine with numeric propertyName', function(t) {
  t.plan(2);
  var obj = {x: [0, 1, 2], y: [null, -1]};
  t.ok(compare(pluck(obj, 1), {x: 1, y: -1}));
  var obj2 = {a: [{}, null], b: [null], c: [10]};
  t.ok(compare(pluck(obj2, 0), {a: {}, b: null, c: 10}));
  t.end();
});
