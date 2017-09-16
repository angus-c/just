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
