var test = require('../util/test')(__filename);
var clone = require('../../packages/collection-clone');

test('copies entire tree', function(t) {
  t.plan(2);
  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  t.deepEqual(objClone, obj);

  var arr = [1, 2, ['a', 'b', {dd: [1, 2, 3]}]];
  var arrClone = clone(arr);
  t.deepEqual(arrClone, arr);

  t.end();
});

test('clones child plain objects and arrays', function(t) {
  t.plan(2);
  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  arr.push(4);
  subObj.bb = 2;
  t.deepEqual(obj, {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1, bb: 2}});
  t.deepEqual(objClone, {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1}});

  t.end();
});

test('clones Dates and RegExps', function(t) {
  t.plan(14);
  var objToString = Object.prototype.toString;

  // as root objects
  var obj1 = new Date();
  var obj1Clone = clone(obj1);
  t.equal(objToString.call(obj1Clone), '[object Date]');
  obj1Clone.setTime(obj1.getTime() + 44);
  t.equal(obj1.getTime() - obj1Clone.getTime(), -44);

  var obj2 = /a(b)cde/gim;
  var obj2Clone = clone(obj2);
  t.equal(objToString.call(obj2Clone), '[object RegExp]');
  obj2.compile(/a(c)brg/gi);
  t.equal(obj2.source, 'a(c)brg');
  t.equal(obj2.flags, 'gi');
  t.equal(obj2Clone.source, 'a(b)cde');
  t.equal(obj2Clone.flags, 'gim');

  // as properties
  var date = new Date();
  var regexp = /a(b)c/gim;
  var obj3 = {b: date, c: regexp};
  var obj3Clone = clone(obj3);
  t.equal(objToString.call(obj3Clone.b), '[object Date]');
  t.equal(objToString.call(obj3Clone.c), '[object RegExp]');
  obj3Clone.b.setTime(date.getTime() + 87);
  t.equal(obj3Clone.b.getTime() - date.getTime(), 87);
  obj3Clone.c.compile(/a(c)/gi);
  t.equal(regexp.source, 'a(b)c');
  t.equal(obj3Clone.c.source, 'a(c)');
  t.equal(regexp.flags, 'gim');
  t.equal(obj3Clone.c.flags, 'gi');

  t.end();
});

test('clones Sets and Maps', function(t) {
  t.plan(24);

  // as root objects
  var set = new Set(['a', 'b', 'c', 'a']);
  var setClone = clone(set);
  t.deepEqual(set.entries(), setClone.entries());
  set.add('d');
  t.deepEqual(Array.from(set.entries()).length, 4);
  t.deepEqual(Array.from(setClone.entries()).length, 3);

  var map = new Map();
  var keys = [{a: 1}, {b: 2}, {c: 3}];
  keys.forEach((key, i) => map.set(key, i));
  var mapClone = clone(map);
  t.deepEqual(map.entries(), mapClone.entries());
  map.set({d: 4}, 3);
  t.deepEqual(Array.from(map.entries()).length, 4);
  t.deepEqual(Array.from(mapClone.entries()).length, 3);

  // as root set object with nested set and map
  var subset1 = new Set(['a', 'b', 'c', 'a']);
  var submap1 = new Map();
  var keys1 = [{a: 1}, {b: 2}, {c: 3}];
  keys1.forEach((key, i) => submap1.set(key, i));

  var set1 = new Set(['a', submap1, subset1, 'a']);
  var set1Clone = clone(set1);
  t.deepEqual(set1.entries(), set1Clone.entries());
  subset1.add('d');
  t.deepEqual(Array.from(Array.from(set1)[2].entries()).length, 4);
  t.deepEqual(Array.from(Array.from(set1Clone)[2].entries()).length, 3);
  submap1.set({d: 4}, 3);
  submap1.set({e: 5}, 4);
  t.deepEqual(Array.from(Array.from(set1)[1].entries()).length, 5);
  t.deepEqual(Array.from(Array.from(set1Clone)[1].entries()).length, 3);

  // as root map object with nested set and map
  var subset2 = new Set(['f', 'f', 'e', 'a']);
  var submap2 = new Map();
  var keys2 = [{aa: 1}, {bb: 2}, {cc: 3}];
  keys2.forEach((key, i) => submap2.set(key, i));

  var map1 = new Map();
  map1.set({map: true}, submap2);
  map1.set({set: true}, subset2);
  var map1Clone = clone(map1);
  t.deepEqual(map1.entries(), map1Clone.entries());
  subset2.add('gg');
  subset2.add('hh');
  t.deepEqual(Array.from(Array.from(map1.entries())[1][1]).length, 5);
  t.deepEqual(Array.from(Array.from(map1Clone.entries())[1][1]).length, 3);
  submap2.set({dd: 4}, 3);
  t.deepEqual(Array.from(Array.from(map1.entries())[0][1]).length, 4);
  t.deepEqual(Array.from(Array.from(map1Clone.entries())[0][1]).length, 3);

  // as properties
  var objToString = Object.prototype.toString;
  var set2 = new Set(['ant', 'bee', 'dragonfly', 'bee']);
  var map2 = new Map();
  var keys2 = [{a: 'red'}, {b: 'green'}, {c: 'blue'}];
  keys2.forEach((key, i) => map2.set(key, i));

  var obj = {b: set2, c: map2};
  var objClone = clone(obj);
  t.equal(objToString.call(objClone.b), '[object Set]');
  t.deepEqual(objClone.b.entries(), obj.b.entries());
  objClone.b.add('spider');
  t.deepEqual(Array.from(objClone.b.entries()).length, 4);
  t.deepEqual(Array.from(obj.b.entries()).length, 3);

  t.equal(objToString.call(objClone.c), '[object Map]');
  t.deepEqual(objClone.c.entries(), obj.c.entries());
  objClone.c.set({d: 'yellow'}, 4);
  t.deepEqual(Array.from(objClone.c.entries()).length, 4);
  t.deepEqual(Array.from(obj.c.entries()).length, 3);

  t.end();
});

test("doesn't clone functions", function(t) {
  t.plan(6);
  var fn = function(a, b) {
    return a + b;
  };
  t.ok(fn === clone(fn));
  var obj = {a: 3, b: 5, c: fn};
  fn.x = 22;
  var objClone = clone(obj);
  fn.x = 34;
  t.deepEqual(objClone, {a: 3, b: 5, c: fn});
  t.equal(objClone.c(2, 3), 5);
  t.equal(fn(2, 3), 5);
  t.equal(objClone.c.x, 34);
  t.equal(fn.x, 34);

  t.end();
});
