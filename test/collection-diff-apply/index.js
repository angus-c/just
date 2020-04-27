var test = require('../util/test')(__filename);
var diffApplyModule = require('../../packages/collection-diff-apply');
var clone = require('../../packages/collection-clone');
var diffApply = diffApplyModule.diffApply;
var jsonPatchPathConverter = diffApplyModule.jsonPatchPathConverter;

test('flat objects', function(t) {
  t.plan(6);
  var obj1 = {a: 3, b: 5};
  var originalDiff = [{op: 'replace', path: ['a'], value: 'hello'}];
  var diff = clone(originalDiff);
  diffApply(obj1, diff);
  t.deepEqual(obj1, {a: 'hello', b: 5});
  t.deepEqual(diff, originalDiff);

  var obj2 = {a: 3, b: 5};
  var originalDiff = [
    {op: 'remove', path: ['b']},
    {op: 'replace', path: ['a'], value: 4},
    {op: 'add', path: ['c'], value: 5},
  ];
  var diff = clone(originalDiff);
  diffApply(obj2, diff);
  t.deepEqual(obj2, {a: 4, c: 5});
  t.deepEqual(diff, originalDiff);

  var obj3 = {a: 3, b: 5};
  var originalDiff = [{op: 'remove', path: ['b']}, {op: 'replace', path: ['a'], value: null}];
  var diff = clone(originalDiff);
  diffApply(obj3, diff);
  t.deepEqual(obj3, {a: null});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('objects with array properties', function(t) {
  t.plan(4);
  var obj3 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'replace', path: ['a'], value: 3},
    {op: 'replace', path: ['b', 2], value: 4},
    {op: 'add', path: ['b', 3], value: 5},
  ];
  var diff = clone(originalDiff);
  diffApply(obj3, diff);
  t.deepEqual(obj3, {a: 3, b: [1, 2, 4, 5]});
  t.deepEqual(diff, originalDiff);

  var obj4 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'remove', path: ['b', 2]},
    {op: 'replace', path: ['a'], value: 3},
    {op: 'replace', path: ['b', 1], value: 3},
  ];
  var diff = clone(originalDiff);

  diffApply(obj4, diff);
  t.deepEqual(obj4, {a: 3, b: [1, 3]});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('objects with array properties using string array keys', function(t) {
  t.plan(4);
  var obj3 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'replace', path: ['a'], value: 3},
    {op: 'replace', path: ['b', '2'], value: 4},
    {op: 'add', path: ['b', '3'], value: 5},
  ];
  var diff = clone(originalDiff);
  diffApply(obj3, diff);
  t.deepEqual(obj3, {a: 3, b: [1, 2, 4, 5]});
  t.deepEqual(diff, originalDiff);

  var obj4 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'remove', path: ['b', '2']},
    {op: 'replace', path: ['a'], value: 3},
    {op: 'replace', path: ['b', '1'], value: 3},
  ];
  var diff = clone(originalDiff);

  diffApply(obj4, diff);
  t.deepEqual(obj4, {a: 3, b: [1, 3]});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('nested objects', function(t) {
  t.plan(4);
  var obj5 = {a: 4, b: {c: 3}};
  var originalDiff = [
    {op: 'remove', path: ['b', 'c']},
    {op: 'replace', path: ['a'], value: 5},
    {op: 'add', path: ['b', 'd'], value: 4},
  ];
  var diff = clone(originalDiff);
  diffApply(obj5, diff);
  t.deepEqual(obj5, {a: 5, b: {d: 4}});
  t.deepEqual(diff, originalDiff);

  var obj6 = {a: 4, b: {c: 3}};
  var originalDiff = [
    {op: 'remove', path: ['a']},
    {op: 'replace', path: ['b', 'c'], value: 9},
    {op: 'add', path: ['d'], value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj6, diff);
  t.deepEqual(obj6, {d: 2, b: {c: 9}});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('arrays', function(t) {
  t.plan(4);
  var obj7 = ['a', {b: 3}, 'c', 'd'];
  var originalDiff = [
    {op: 'remove', path: [1, 'b']},
    {op: 'replace', path: [0], value: 'b'},
    {op: 'replace', path: [2], value: 'd'},
    {op: 'add', path: [1, 'e'], value: 4},
    {op: 'add', path: [4], value: 'f'},
  ];
  var diff = clone(originalDiff);
  diffApply(obj7, diff);
  t.deepEqual(obj7, ['b', {e: 4}, 'd', 'd', 'f']);
  t.deepEqual(diff, originalDiff);

  var obj8 = ['a', {b: 3}, 'c', 'd'];
  var originalDiff = [
    {op: 'remove', path: [0]},
    {op: 'add', path: [0, 'c'], value: 6},
    {op: 'replace', path: [2], value: 'ab'},
    {op: 'add', path: [1], value: 12},
  ];
  var diff = clone(originalDiff);
  diffApply(obj8, diff);
  t.deepEqual(obj8, [{b: 3, c: 6}, 12, 'ab']);
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('object vs array', function(t) {
  t.plan(7);
  var obj9 = {a: 2};
  var originalDiff = [
    {op: 'remove', path: ['a']},
    {op: 'add', path: [0], value: 'a'},
    {op: 'add', path: [1], value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj9, diff);
  t.deepEqual(obj9, {'0': 'a', '1': 2});
  t.deepEqual(diff, originalDiff);

  var obj10 = ['a', 2];
  var originalDiff = [
    {op: 'remove', path: [0]},
    {op: 'remove', path: [0]},
    {op: 'add', path: ['a'], value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj10, diff);
  t.ok(typeof obj10 == 'object');
  t.ok(Array.isArray(obj10), true);
  t.equal(obj10.a, 2);
  t.equal(obj10.length, 0);
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('replacing falsey values', function(t) {
  t.plan(2);
  var obj11 = {a: false, b: null, c: 0};
  var originalDiff = [
    {op: 'replace', path: ['a'], value: true},
    {op: 'replace', path: ['b'], value: 'bb'},
    {op: 'replace', path: ['c'], value: 1},
  ];
  var diff = clone(originalDiff);
  diffApply(obj11, diff);
  t.deepEqual(obj11, {a: true, b: 'bb', c: 1});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('flat objects using js patch standard', function(t) {
  t.plan(4);
  var obj1 = {a: 3, b: 5};
  var originalDiff = [{op: 'replace', path: '/a', value: 'hello'}];
  var diff = clone(originalDiff);
  diffApply(obj1, diff, jsonPatchPathConverter);
  t.deepEqual(obj1, {a: 'hello', b: 5});
  t.deepEqual(diff, originalDiff);

  var obj2 = {a: 3, b: 5};
  var originalDiff = [
    {op: 'remove', path: '/b'},
    {op: 'replace', path: '/a', value: 4},
    {op: 'add', path: '/c', value: 5},
  ];
  var diff = clone(originalDiff);
  diffApply(obj2, diff, jsonPatchPathConverter);
  t.deepEqual(obj2, {a: 4, c: 5});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('objects with array properties using js patch standard', function(t) {
  t.plan(4);
  var obj3 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'replace', path: '/a', value: 3},
    {op: 'replace', path: '/b/2', value: 4},
    {op: 'add', path: '/b/3', value: 5},
  ];
  var diff = clone(originalDiff);
  diffApply(obj3, diff, jsonPatchPathConverter);
  t.deepEqual(obj3, {a: 3, b: [1, 2, 4, 5]});
  t.deepEqual(diff, originalDiff);

  var obj4 = {a: 4, b: [1, 2, 3]};
  var originalDiff = [
    {op: 'remove', path: '/b/2'},
    {op: 'replace', path: '/a', value: 3},
    {op: 'replace', path: '/b/1', value: 3},
  ];
  var diff = clone(originalDiff);
  diffApply(obj4, diff, jsonPatchPathConverter);
  t.deepEqual(obj4, {a: 3, b: [1, 3]});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('nested objects using js patch standard', function(t) {
  t.plan(4);
  var obj5 = {a: 4, b: {c: 3}};
  var originalDiff = [
    {op: 'remove', path: '/b/c'},
    {op: 'replace', path: '/a', value: 5},
    {op: 'add', path: '/b/d', value: 4},
  ];
  var diff = clone(originalDiff);
  diffApply(obj5, diff, jsonPatchPathConverter);
  t.deepEqual(obj5, {a: 5, b: {d: 4}});
  t.deepEqual(diff, originalDiff);

  var obj6 = {a: 4, b: {c: 3}};
  var originalDiff = [
    {op: 'remove', path: '/a'},
    {op: 'replace', path: '/b/c', value: 9},
    {op: 'add', path: '/d', value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj6, diff, jsonPatchPathConverter);
  t.deepEqual(obj6, {d: 2, b: {c: 9}});
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('arrays using js patch standard', function(t) {
  t.plan(4);
  var obj7 = ['a', {b: 3}, 'c', 'd'];
  var originalDiff = [
    {op: 'remove', path: '/a'},
    {op: 'replace', path: '/b/c', value: 9},
    {op: 'add', path: '/d', value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(
    obj7,
    [
      {op: 'remove', path: '/1/b'},
      {op: 'replace', path: '/0', value: 'b'},
      {op: 'replace', path: '/2', value: 'd'},
      {op: 'add', path: '/1/e', value: 4},
      {op: 'add', path: '/4', value: 'f'},
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj7, ['b', {e: 4}, 'd', 'd', 'f']);
  t.deepEqual(diff, originalDiff);

  var obj8 = ['a', {b: 3}, 'c', 'd'];
  var originalDiff = [
    {op: 'remove', path: '/a'},
    {op: 'replace', path: '/b/c', value: 9},
    {op: 'add', path: '/d', value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(
    obj8,
    [
      {op: 'remove', path: '/0'},
      {op: 'add', path: '/0/c', value: 6},
      {op: 'replace', path: '/2', value: 'ab'},
      {op: 'add', path: '/1', value: 12},
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj8, [{b: 3, c: 6}, 12, 'ab']);
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('object vs array using js patch standard', function(t) {
  t.plan(7);
  var obj9 = {a: 2};
  var originalDiff = [
    {op: 'remove', path: '/a'},
    {op: 'add', path: '/0', value: 'a'},
    {op: 'add', path: '/1', value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj9, diff, jsonPatchPathConverter);
  t.deepEqual(obj9, {'0': 'a', '1': 2});
  t.deepEqual(diff, originalDiff);

  var obj10 = ['a', 2];
  var originalDiff = [
    {op: 'remove', path: '/0'},
    {op: 'remove', path: '/0'},
    {op: 'add', path: '/a', value: 2},
  ];
  var diff = clone(originalDiff);
  diffApply(obj10, diff, jsonPatchPathConverter);
  t.ok(typeof obj10 == 'object');
  t.ok(Array.isArray(obj10), true);
  t.equal(obj10.a, 2);
  t.equal(obj10.length, 0);
  t.deepEqual(diff, originalDiff);
  t.end();
});

test('replacing falsey values using js patch standard', function(t) {
  t.plan(2);
  var obj11 = {a: false, b: null, c: 0};
  var originalDiff = [
    {op: 'replace', path: '/a', value: true},
    {op: 'replace', path: '/b', value: 'bb'},
    {op: 'replace', path: '/c', value: 1},
  ];
  var diff = clone(originalDiff);
  diffApply(obj11, diff, jsonPatchPathConverter);
  t.deepEqual(obj11, {a: true, b: 'bb', c: 1});
  t.deepEqual(diff, originalDiff);
  t.end();
});
