var test = require('../util/test')(__filename);
var diffApplyModule = require('../../packages/collection-diff-apply');
var diffApply = diffApplyModule.diffApply;
var jsonPatchPathConverter = diffApplyModule.jsonPatchPathConverter;

test('flat objects', function (t) {
  t.plan(3);
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

  var obj3 = { a: 3, b: 5 };
  diffApply(obj3, [
    { op: 'remove', path: ['b'] },
    { op: 'replace', path: ['a'], value: null }
  ]);
  t.deepEqual(obj3, { a: null });
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

test('flat objects using js patch standard', function (t) {
  t.plan(2);
  var obj1 = { a: 3, b: 5 };
  diffApply(obj1, [{ op: 'replace', path: '/a', value: 'hello' }], jsonPatchPathConverter);
  t.deepEqual(obj1, { a: 'hello', b: 5 });

  var obj2 = { a: 3, b: 5 };
  diffApply(
    obj2,
    [
      { op: 'remove', path: '/b' },
      { op: 'replace', path: '/a', value: 4 },
      { op: 'add', path: '/c', value: 5 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj2, { a: 4, c: 5 });
  t.end();
});

test('objects with array properties using js patch standard', function (t) {
  t.plan(2);
  var obj3 = { a: 4, b: [1, 2, 3] };
  diffApply(
    obj3,
    [
      { op: 'replace', path: '/a', value: 3 },
      { op: 'replace', path: '/b/2', value: 4 },
      { op: 'add', path: '/b/3', value: 5 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj3, { a: 3, b: [1, 2, 4, 5] });

  var obj4 = { a: 4, b: [1, 2, 3] };
  diffApply(
    obj4,
    [
      { op: 'remove', path: '/b/2' },
      { op: 'replace', path: '/a', value: 3 },
      { op: 'replace', path: '/b/1', value: 3 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj4, { a: 3, b: [1, 3] });
  t.end();
});

test('nested objects using js patch standard', function (t) {
  t.plan(2);
  var obj5 = { a: 4, b: { c: 3 } };
  diffApply(
    obj5,
    [
      { op: 'remove', path: '/b/c' },
      { op: 'replace', path: '/a', value: 5 },
      { op: 'add', path: '/b/d', value: 4 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj5, { a: 5, b: { d: 4 } });

  var obj6 = { a: 4, b: { c: 3 } };
  diffApply(
    obj6,
    [
      { op: 'remove', path: '/a' },
      { op: 'replace', path: '/b/c', value: 9 },
      { op: 'add', path: '/d', value: 2 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj6, { d: 2, b: { c: 9 } });
  t.end();
});

test('arrays using js patch standard', function (t) {
  t.plan(2);
  var obj7 = ['a', { b: 3 }, 'c', 'd'];
  diffApply(
    obj7,
    [
      { op: 'remove', path: '/1/b' },
      { op: 'replace', path: '/0', value: 'b' },
      { op: 'replace', path: '/2', value: 'd' },
      { op: 'add', path: '/1/e', value: 4 },
      { op: 'add', path: '/4', value: 'f' }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj7, ['b', { e: 4 }, 'd', 'd', 'f']);

  var obj8 = ['a', { b: 3 }, 'c', 'd'];
  diffApply(
    obj8,
    [
      { op: 'remove', path: '/0' },
      { op: 'add', path: '/0/c', value: 6 },
      { op: 'replace', path: '/2', value: 'ab' },
      { op: 'add', path: '/1', value: 12 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj8, [{ b: 3, c: 6 }, 12, 'ab']);
  t.end();
});

test('object vs array using js patch standard', function (t) {
  t.plan(2);
  var obj9 = { a: 2 };
  diffApply(
    obj9,
    [
      { op: 'remove', path: '/a' },
      { op: 'add', path: '/0', value: 'a' },
      { op: 'add', path: '/1', value: 2 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj9, ['a', 2]);

  var obj10 = ['a', 2];
  diffApply(
    obj10,
    [
      { op: 'remove', path: '/0' },
      { op: 'remove', path: '/0' },
      { op: 'add', path: '/a', value: 2 }
    ],
    jsonPatchPathConverter
  );
  t.deepEqual(obj10, { a: 2 });
  t.end();
});
