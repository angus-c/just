var test = require('tape');
var diffApplyModule = require('../../packages/collection-diff-apply');
var diffApply = diffApplyModule.diffApply;
// var jsonPatchPathConverter = diffApplyModule.jsonPatchPathConverter;
// var compare = require('../../packages/collection-compare');

test('flat objects', function (t) {
  t.plan(2);
  var obj1 = { a: 3, b: 5 };
  diffApply(obj1, [{ op: 'replace', path: ['a'], value: 'hello' }]);
  t.deepEqual(obj1, { a: 'hello', b: 5 });

  var obj2 = { a: 3, b: 5 };
  diffApply(obj2, [
    { op: 'remove', path: ['b'] },
    { op: 'replace', path: ['a'], value: 4 },
    { op: 'add', path: ['c'], value: 5 }
  ]);
  t.deepEqual(obj2, { a: 4, c: 5 });
  t.end();
});

test('objects with array properties', function (t) {
  t.plan(2);
  var obj3 = { a: 4, b: [1, 2, 3] };
  diffApply(obj3, [
    { op: 'replace', path: ['a'], value: 3 },
    { op: 'replace', path: ['b', '2'], value: 4 },
    { op: 'add', path: ['b', '3'], value: 5 }
  ]);
  t.deepEqual(obj3, { a: 3, b: [1, 2, 4, 5] });

  var obj4 = { a: 4, b: [1, 2, 3] };
  diffApply(obj4, [
    { op: 'remove', path: ['b', '2'] },
    { op: 'replace', path: ['a'], value: 3 },
    { op: 'replace', path: ['b', '1'], value: 3 }
  ]);
  t.deepEqual(obj4, { a: 3, b: [1, 3] });
  t.end();
});

test('nested objects', function (t) {
  t.plan(2);
  var obj5 = { a: 4, b: { c: 3 } };
  diffApply(obj5, [
    { op: 'remove', path: ['b', 'c'] },
    { op: 'replace', path: ['a'], value: 5 },
    { op: 'add', path: ['b', 'd'], value: 4 }
  ]);
  t.deepEqual(obj5, { a: 5, b: { d: 4 } });

  var obj6 = { a: 4, b: { c: 3 } };
  diffApply(obj6, [
    { op: 'remove', path: ['a'] },
    { op: 'replace', path: ['b', 'c'], value: 9 },
    { op: 'add', path: ['d'], value: 2 }
  ]);
  t.deepEqual(obj6, { d: 2, b: { c: 9 } });
  t.end();
});

test('arrays', function (t) {
  t.plan(2);
  var obj7 = ['a', { b: 3 }, 'c', 'd'];
  diffApply(obj7, [
    { op: 'remove', path: ['1', 'b'] },
    { op: 'replace', path: ['0'], value: 'b' },
    { op: 'replace', path: ['2'], value: 'd' },
    { op: 'add', path: ['1', 'e'], value: 4 },
    { op: 'add', path: ['4'], value: 'f' }
  ]);
  t.deepEqual(obj7, ['b', { e: 4 }, 'd', 'd', 'f']);

  var obj8 = ['a', { b: 3 }, 'c', 'd'];
  diffApply(obj8, [
    { op: 'remove', path: ['0'] },
    { op: 'add', path: ['0', 'c'], value: 6 },
    { op: 'replace', path: ['2'], value: 'ab' },
    { op: 'add', path: ['1'], value: 12 }
  ]);
  t.deepEqual(obj8, [{ b: 3, c: 6 }, 12, 'ab']);
  t.end();
});

test('object vs array', function (t) {
  t.plan(2);
  var obj9 = { a: 2 };
  diffApply(obj9, [
    { op: 'remove', path: ['a'] },
    { op: 'add', path: ['0'], value: 'a' },
    { op: 'add', path: ['1'], value: 2 }
  ]);
  t.deepEqual(obj9, ['a', 2]);

  var obj10 = ['a', 2];
  diffApply(obj10, [
    { op: 'remove', path: ['0'] },
    { op: 'remove', path: ['0'] },
    { op: 'add', path: ['a'], value: 2 }
  ]);
  t.deepEqual(obj10, { a: 2 });
  t.end();
});

// test('object vs array', function (t) {
//   t.plan(2);
//
//   var obj15 = {a: 2};
//   var obj16 = ['a', 2];
//
//   t.ok(compare(diff(obj15, obj16), [
//     { op: 'remove', 'path': ['a'] },
//     { op: 'add', 'path': ['0'], 'value': 'a' },
//     { op: 'add', 'path': ['1'], 'value': 2 }
//   ]));
//   t.ok(compare(diff(obj16, obj15), [
//     { op: 'remove', 'path': ['0'] },
//     { op: 'remove', 'path': ['1'] },
//     { op: 'add', 'path': ['a'], 'value': 2 }
//   ]));
// });
//
// test('flat objects using jsPatchStandard', function (t) {
//   t.plan(6);
//
//   var obj1 = {a: 4, b: 5};
//   var obj2 = {a: 3, b: 5};
//   var obj3 = {a: 4, c: 5};
//
//   t.ok(compare(diff(obj1, obj2, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/a', value: 3 }
//   ]));
//   t.ok(compare(diff(obj2, obj1, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/a', value: 4 }
//   ]));
//   t.ok(compare(diff(obj1, obj3, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b' },
//     { op: 'add', 'path': '/c', value: 5 }
//   ]));
//   t.ok(compare(diff(obj3, obj1, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/c' },
//     { op: 'add', 'path': '/b', value: 5 }
//   ]));
//   t.ok(compare(diff(obj2, obj3, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b' },
//     { op: 'replace', 'path': '/a', value: 4 },
//     { op: 'add', 'path': '/c', value: 5 }
//   ]));
//   t.ok(compare(diff(obj3, obj2, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/c' },
//     { op: 'replace', 'path': '/a', value: 3 },
//     { op: 'add', 'path': '/b', value: 5 }
//   ]));
// });
//
// test('objects with array properties using jsPatchStandard', function (t) {
//   t.plan(6);
//
//   var obj4 = {a: 4, b: [1, 2, 3]};
//   var obj5 = {a: 3, b: [1, 2, 4]};
//   var obj6 = {a: 3, b: [1, 2, 4, 5]};
//
//   t.ok(compare(diff(obj4, obj5, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/a', value: 3 },
//     { op: 'replace', 'path': '/b/2', value: 4 }
//   ]));
//   t.ok(compare(diff(obj5, obj4, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/a', value: 4 },
//     { op: 'replace', 'path': '/b/2', value: 3 }
//   ]));
//   t.ok(compare(diff(obj4, obj6, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/a', value: 3 },
//     { op: 'replace', 'path': '/b/2', value: 4 },
//     { op: 'add', 'path': '/b/3', value: 5 }
//   ]));
//   t.ok(compare(diff(obj6, obj4, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/3' },
//     { op: 'replace', 'path': '/a', value: 4 },
//     { op: 'replace', 'path': '/b/2', value: 3 }
//   ]));
//   t.ok(compare(diff(obj5, obj6, jsonPatchPathConverter), [
//     { op: 'add', 'path': '/b/3', value: 5 }
//   ]));
//   t.ok(compare(diff(obj6, obj5, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/3' }
//   ]));
// });
//
// test('nested objects using jsPatchStandard', function (t) {
//   t.plan(8);
//
//   var obj7 = {a: 4, b: {c: 3}};
//   var obj8 = {a: 4, b: {c: 4}};
//   var obj9 = {a: 5, b: {d: 4}};
//   var obj10 = {a: 4};
//   var obj11 = {a: 4, b: {c: 4}};
//
//   t.ok(compare(diff(obj7, obj8, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/b/c', value: 4 }
//   ]));
//   t.ok(compare(diff(obj8, obj7, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/b/c', value: 3 }
//   ]));
//   t.ok(compare(diff(obj7, obj9, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/c' },
//     { op: 'replace', 'path': '/a', value: 5 },
//     { op: 'add', 'path': '/b/d', value: 4 }
//   ]));
//   t.ok(compare(diff(obj9, obj7, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/d' },
//     { op: 'replace', 'path': '/a', value: 4 },
//     { op: 'add', 'path': '/b/c', value: 3 }
//   ]));
//   t.ok(compare(diff(obj8, obj9, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/c' },
//     { op: 'replace', 'path': '/a', value: 5 },
//     { op: 'add', 'path': '/b/d', value: 4 }
//   ]));
//   t.ok(compare(diff(obj9, obj8, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b/d' },
//     { op: 'replace', 'path': '/a', value: 4 },
//     { op: 'add', 'path': '/b/c', value: 4 }
//   ]));
//   t.ok(compare(diff(obj10, obj11, jsonPatchPathConverter), [
//     { op: 'add', 'path': '/b', value: {c: 4} }
//   ]));
//   t.ok(compare(diff(obj11, obj10, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/b' }
//   ]));
// });
//
// test('arrays using jsPatchStandard', function (t) {
//   t.plan(6);
//
//   var obj12 = ['a', {a: 2}, 'c'];
//   var obj13 = ['a', {a: 3}, 'd'];
//   var obj14 = ['b', {b: 3}, 'd', 'e'];
//
//   t.ok(compare(diff(obj12, obj13, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/1/a', value: 3 },
//     { op: 'replace', 'path': '/2', value: 'd' }
//   ]));
//   t.ok(compare(diff(obj13, obj12, jsonPatchPathConverter), [
//     { op: 'replace', 'path': '/1/a', value: 2 },
//     { op: 'replace', 'path': '/2', value: 'c' }
//   ]));
//   t.ok(compare(diff(obj12, obj14, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/1/a' },
//     { op: 'replace', 'path': '/0', value: 'b' },
//     { op: 'replace', 'path': '/2', value: 'd' },
//     { op: 'add', 'path': '/1/b', value: 3 },
//     { op: 'add', 'path': '/3', value: 'e' }
//   ]));
//   t.ok(compare(diff(obj13, obj14, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/1/a' },
//     { op: 'replace', 'path': '/0', value: 'b' },
//     { op: 'add', 'path': '/1/b', value: 3 },
//     { op: 'add', 'path': '/3', value: 'e' }
//   ]));
//   t.ok(compare(diff(obj13, obj14, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/1/a' },
//     { op: 'replace', 'path': '/0', value: 'b' },
//     { op: 'add', 'path': '/1/b', value: 3 },
//     { op: 'add', 'path': '/3', value: 'e' }
//   ]));
//   t.ok(compare(diff(obj14, obj13, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/3' },
//     { op: 'remove', 'path': '/1/b' },
//     { op: 'replace', 'path': '/0', value: 'a' },
//     { op: 'add', 'path': '/1/a', value: 3 }
//   ]));
// });
//
// test('object vs array using jsPatchStandard', function (t) {
//   t.plan(2);
//
//   var obj15 = {a: 2};
//   var obj16 = ['a', 2];
//
//   t.ok(compare(diff(obj15, obj16, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/a' },
//     { op: 'add', 'path': '/0', 'value': 'a' },
//     { op: 'add', 'path': '/1', 'value': 2 }
//   ]));
//   t.ok(compare(diff(obj16, obj15, jsonPatchPathConverter), [
//     { op: 'remove', 'path': '/0' },
//     { op: 'remove', 'path': '/1' },
//     { op: 'add', 'path': '/a', 'value': 2 }
//   ]));
// });
//
// test('nested objects using custom converter', function (t) {
//   t.plan(8);
//
//   var converter = function (path) {
//     return path.join('-');
//   };
//   var obj7 = {a: 4, b: {c: 3}};
//   var obj8 = {a: 4, b: {c: 4}};
//   var obj9 = {a: 5, b: {d: 4}};
//   var obj10 = {a: 4};
//   var obj11 = {a: 4, b: {c: 4}};
//
//   t.ok(compare(diff(obj7, obj8, converter), [
//     { op: 'replace', 'path': 'b-c', value: 4 }
//   ]));
//   t.ok(compare(diff(obj8, obj7, converter), [
//     { op: 'replace', 'path': 'b-c', value: 3 }
//   ]));
//   t.ok(compare(diff(obj7, obj9, converter), [
//     { op: 'remove', 'path': 'b-c' },
//     { op: 'replace', 'path': 'a', value: 5 },
//     { op: 'add', 'path': 'b-d', value: 4 }
//   ]));
//   t.ok(compare(diff(obj9, obj7, converter), [
//     { op: 'remove', 'path': 'b-d' },
//     { op: 'replace', 'path': 'a', value: 4 },
//     { op: 'add', 'path': 'b-c', value: 3 }
//   ]));
//   t.ok(compare(diff(obj8, obj9, converter), [
//     { op: 'remove', 'path': 'b-c' },
//     { op: 'replace', 'path': 'a', value: 5 },
//     { op: 'add', 'path': 'b-d', value: 4 }
//   ]));
//   t.ok(compare(diff(obj9, obj8, converter), [
//     { op: 'remove', 'path': 'b-d' },
//     { op: 'replace', 'path': 'a', value: 4 },
//     { op: 'add', 'path': 'b-c', value: 4 }
//   ]));
//   t.ok(compare(diff(obj10, obj11, converter), [
//     { op: 'add', 'path': 'b', value: {c: 4} }
//   ]));
//   t.ok(compare(diff(obj11, obj10, converter), [
//     { op: 'remove', 'path': 'b' }
//   ]));

// test('invalid inputs', function (t) {
//   t.plan(6);
//
//   t.throws(function () {compare(diff(null, null));});
//   t.throws(function () {compare(diff(undefined, undefined));});
//   t.throws(function () {compare(diff({a: 2}, undefined));});
//   t.throws(function () {compare(diff(null, {b: 4}));});
//   t.throws(function () {compare(diff(7, 6));});
//   t.throws(function () {compare(diff(function (a, b) {return a + b;}, 6));});
// });
