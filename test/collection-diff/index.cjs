var test = require('../util/test')(__filename);
var {
  diff,
  jsonPatchPathConverter,
} = require('../../packages/collection-diff');
var {
  diffApply,
  jsonPatchPathConverter: jsonPatchApplier,
} = require('../../packages/collection-diff-apply');
var compare = require('../../packages/collection-compare');

test('flat objects', function(t) {
  t.plan(8);

  var obj1 = {a: 4, b: 5};
  var obj2 = {a: 3, b: 5};
  var obj3 = {a: 4, c: 5};

  t.ok(compare(diff(obj1, obj2), [{op: 'replace', path: ['a'], value: 3}]));
  t.ok(compare(diff(obj2, obj1), [{op: 'replace', path: ['a'], value: 4}]));
  t.ok(
    compare(diff(obj1, obj3), [
      {op: 'remove', path: ['b']},
      {op: 'add', path: ['c'], value: 5},
    ])
  );
  t.ok(
    compare(diff(obj3, obj1), [
      {op: 'remove', path: ['c']},
      {op: 'add', path: ['b'], value: 5},
    ])
  );
  t.ok(
    compare(diff(obj2, obj3), [
      {op: 'remove', path: ['b']},
      {op: 'replace', path: ['a'], value: 4},
      {op: 'add', path: ['c'], value: 5},
    ])
  );
  t.ok(
    compare(diff(obj3, obj2), [
      {op: 'remove', path: ['c']},
      {op: 'replace', path: ['a'], value: 3},
      {op: 'add', path: ['b'], value: 5},
    ])
  );

  var obj4 = {a: 3, b: null};
  t.ok(
    compare(diff(obj1, obj4), [
      {op: 'replace', path: ['a'], value: 3},
      {op: 'replace', path: ['b'], value: null},
    ])
  );
  t.ok(
    compare(diff(obj4, obj1), [
      {op: 'replace', path: ['a'], value: 4},
      {op: 'replace', path: ['b'], value: 5},
    ])
  );
});

test('flat null and undefined', function(t) {
  t.plan(4);

  t.ok(
    compare(
      diff(
        {
          foo: null,
        },
        {
          foo: null,
        }
      ),
      []
    )
  );

  t.ok(
    compare(
      diff(
        {
          foo: undefined,
        },
        {
          foo: undefined,
        }
      ),
      []
    )
  );

  t.ok(
    compare(
      diff(
        {
          foo: undefined,
        },
        {
          foo: null,
        }
      ),
      [{op: 'replace', path: ['foo'], value: null}]
    )
  );

  t.ok(
    compare(
      diff(
        {
          foo: null,
        },
        {
          foo: undefined,
        }
      ),
      [{op: 'replace', path: ['foo'], value: undefined}]
    )
  );
});

test('objects with array properties', function(t) {
  t.plan(6);

  var obj4 = {a: 4, b: [1, 2, 3]};
  var obj5 = {a: 3, b: [1, 2, 4]};
  var obj6 = {a: 3, b: [1, 2, 4, 5]};

  t.ok(
    compare(diff(obj4, obj5), [
      {op: 'replace', path: ['a'], value: 3},
      {op: 'replace', path: ['b', 2], value: 4},
    ])
  );
  t.ok(
    compare(diff(obj5, obj4), [
      {op: 'replace', path: ['a'], value: 4},
      {op: 'replace', path: ['b', 2], value: 3},
    ])
  );
  t.ok(
    compare(diff(obj4, obj6), [
      {op: 'replace', path: ['a'], value: 3},
      {op: 'replace', path: ['b', 2], value: 4},
      {op: 'add', path: ['b', 3], value: 5},
    ])
  );
  t.ok(
    compare(diff(obj6, obj4), [
      {op: 'remove', path: ['b', 3]},
      {op: 'replace', path: ['a'], value: 4},
      {op: 'replace', path: ['b', 2], value: 3},
    ])
  );
  t.ok(compare(diff(obj5, obj6), [{op: 'add', path: ['b', 3], value: 5}]));
  t.ok(compare(diff(obj6, obj5), [{op: 'remove', path: ['b', 3]}]));
});

test('objects with nulls against array properties', function(t) {
  t.plan(2);

  t.ok(
    compare(
      diff(
        {
          foo: null,
        },
        {
          foo: [1, 2, 3],
        }
      ),
      [{op: 'replace', path: ['foo'], value: [1, 2, 3]}]
    )
  );

  t.ok(
    compare(
      diff(
        {
          foo: undefined,
        },
        {
          foo: [1, 2, 3],
        }
      ),
      [{op: 'replace', path: ['foo'], value: [1, 2, 3]}]
    )
  );
});

test('nested objects', function(t) {
  t.plan(8);

  var obj7 = {a: 4, b: {c: 3}};
  var obj8 = {a: 4, b: {c: 4}};
  var obj9 = {a: 5, b: {d: 4}};
  var obj10 = {a: 4};
  var obj11 = {a: 4, b: {c: 4}};

  t.ok(
    compare(diff(obj7, obj8), [{op: 'replace', path: ['b', 'c'], value: 4}])
  );
  t.ok(
    compare(diff(obj8, obj7), [{op: 'replace', path: ['b', 'c'], value: 3}])
  );
  t.ok(
    compare(diff(obj7, obj9), [
      {op: 'remove', path: ['b', 'c']},
      {op: 'replace', path: ['a'], value: 5},
      {op: 'add', path: ['b', 'd'], value: 4},
    ])
  );
  t.ok(
    compare(diff(obj9, obj7), [
      {op: 'remove', path: ['b', 'd']},
      {op: 'replace', path: ['a'], value: 4},
      {op: 'add', path: ['b', 'c'], value: 3},
    ])
  );
  t.ok(
    compare(diff(obj8, obj9), [
      {op: 'remove', path: ['b', 'c']},
      {op: 'replace', path: ['a'], value: 5},
      {op: 'add', path: ['b', 'd'], value: 4},
    ])
  );
  t.ok(
    compare(diff(obj9, obj8), [
      {op: 'remove', path: ['b', 'd']},
      {op: 'replace', path: ['a'], value: 4},
      {op: 'add', path: ['b', 'c'], value: 4},
    ])
  );
  t.ok(
    compare(diff(obj10, obj11), [{op: 'add', path: ['b'], value: {c: 4}}])
  );
  t.ok(compare(diff(obj11, obj10), [{op: 'remove', path: ['b']}]));
});

test('objects with nulls against nested objects', function(t) {
  t.plan(2);

  t.ok(
    compare(
      diff(
        {
          foo: null,
        },
        {
          foo: {bar: 'smang'},
        }
      ),
      [{op: 'replace', path: ['foo'], value: {bar: 'smang'}}]
    )
  );

  t.ok(
    compare(
      diff(
        {
          foo: undefined,
        },
        {
          foo: {bar: 'smang'},
        }
      ),
      [{op: 'replace', path: ['foo'], value: {bar: 'smang'}}]
    )
  );
});

test('arrays', function(t) {
  t.plan(8);

  var obj12 = ['a', {a: 2}, 'c'];
  var obj13 = ['a', {a: 3}, 'd'];
  var obj14 = ['b', {b: 3}, 'd', 'e'];
  var obj14a = ['a', 'b', {b: 3}, 'd', 'e'];

  t.ok(
    compare(diff(obj12, obj13), [
      {op: 'replace', path: [1, 'a'], value: 3},
      {op: 'replace', path: [2], value: 'd'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj12), [
      {op: 'replace', path: [1, 'a'], value: 2},
      {op: 'replace', path: [2], value: 'c'},
    ])
  );
  t.ok(
    compare(diff(obj12, obj14), [
      {op: 'remove', path: [1, 'a']},
      {op: 'replace', path: [0], value: 'b'},
      {op: 'replace', path: [2], value: 'd'},
      {op: 'add', path: [1, 'b'], value: 3},
      {op: 'add', path: [3], value: 'e'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj14), [
      {op: 'remove', path: [1, 'a']},
      {op: 'replace', path: [0], value: 'b'},
      {op: 'add', path: [1, 'b'], value: 3},
      {op: 'add', path: [3], value: 'e'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj14), [
      {op: 'remove', path: [1, 'a']},
      {op: 'replace', path: [0], value: 'b'},
      {op: 'add', path: [1, 'b'], value: 3},
      {op: 'add', path: [3], value: 'e'},
    ])
  );

  t.ok(
    compare(diff(obj14, obj13), [
      {op: 'remove', path: [ 0 ]},
      {op: 'replace', path: [ 0 ], value: 'a'},
      {op: 'replace', path: [ 1 ], value: {a: 3}},
      {op: 'replace', path: [ 2 ], value: 'd'},
    ])
  );

  t.ok(
    compare(diff(obj14, obj14a), [
      {op: 'replace', path: [ 0 ], value: 'a'},
      {op: 'replace', path: [ 1 ], value: 'b'},
      {op: 'replace', path: [ 2 ], value: {b: 3}},
      {op: 'replace', path: [ 3 ], value: 'd'},
      {op: 'add', path: [ 4 ], value: 'e'},
    ])
  );

  t.ok(
    compare(diff(obj14a, obj14), [
      {op: 'remove', path: [0]},
    ])
  );
});

test('object vs array', function(t) {
  t.plan(2);

  var obj15 = {a: 2};
  var obj16 = ['a', 2];

  t.ok(
    compare(diff(obj15, obj16), [
      {op: 'remove', path: ['a']},
      {op: 'add', path: [0], value: 'a'},
      {op: 'add', path: [1], value: 2},
    ])
  );
  t.ok(
    compare(diff(obj16, obj15), [
      {op: 'remove', path: [1]},
      {op: 'remove', path: [0]},
      {op: 'add', path: ['a'], value: 2},
    ])
  );
});

test('round trip', function(t) {
  t.plan(8);

  var obj15 = [1, 2, 3, 4, 5, 17, 18];
  var obj16 = [2];

  var thisDiff = diff(obj15, obj16);
  diffApply(obj15, thisDiff);
  t.ok(compare(obj15, obj16));

  var obj15a = {numbers: [1, 2, 3, 4]};
  var obj16a = {numbers: [5, 6]};

  var thisDiff = diff(obj15a, obj16a);
  diffApply(obj15a, thisDiff);
  t.ok(compare(obj15a, obj16a));

  var obj15a = [1, 2, 3, 4, 5, 17, 18];
  var obj16a = [2];

  thisDiff = diff(obj16a, obj15a);
  diffApply(obj16a, thisDiff);
  t.ok(compare(obj15a, obj16a));

  var obj17 = {a: [1, 2], b: {c: 3, d: 4, f: [23, 'l']}};
  var obj18 = {c: [1, 2], e: {c: 5, e: 1, f: [23, 'l', 'x']}};

  var thisDiff = diff(obj17, obj18);
  diffApply(obj17, thisDiff);
  t.ok(compare(obj17, obj18));

  var obj17a = {a: [1, 2], b: {c: 3, d: 4, f: [23, 'l']}};
  var obj18a = {c: [1, 2], e: {c: 5, e: 1, f: [23, 'l', 'x']}};

  thisDiff = diff(obj18a, obj17a);
  diffApply(obj18a, thisDiff);
  t.ok(compare(obj17a, obj18a));

  var obj17b = ['a', {a: 3}, 'd'];
  var obj18b = ['b', {b: 3}, 'd', 'e'];

  thisDiff = diff(obj17b, obj18b);
  diffApply(obj17b, thisDiff);
  t.ok(compare(obj17b, obj18b));

  var obj17c = ['a', {a: 3}, 'd'];
  var obj18c = ['b', {b: 3}, 'd', 'e'];

  thisDiff = diff(obj18c, obj17c);
  diffApply(obj18c, thisDiff);
  t.ok(compare(obj17c, obj18c));

  var obj17d = [{a: 9, b: [1, 2, 3]}];
  var obj18d = [{a: 9, b: [2, 3]}];

  thisDiff = diff(obj18d, obj17d);
  diffApply(obj18d, thisDiff);
  t.ok(compare(obj17d, obj18d));
});

test('objects whose properties are objects but with no properties of their own', function(t) {
  t.plan(1);

  var obj19 = {
    a: 4,
    b1: new Date('1990-01-22T15:14:10.837Z'),
    b2: new Date('1993-01-22T15:14:10.837Z'),
    c1: /abc/,
    c2: /def/,
    d: JSON,
  };

  var obj20 = {
    a: 3,
    b1: new Date('2018-01-22T15:11:19.244Z'),
    b2: new Date('1993-01-22T15:14:10.837Z'),
    c1: /bcd/,
    c2: /def/,
    d: JSON,
  };

  t.ok(
    compare(diff(obj19, obj20), [
      {op: 'replace', path: ['a'], value: 3},
      {
        op: 'replace',
        path: ['b1'],
        value: new Date('2018-01-22T15:11:19.244Z'),
      },
      {op: 'replace', path: ['c1'], value: /bcd/},
    ])
  );
});

test.only('path optimization for array', function(t) {
  // t.plan(8);

  // var obj21 = [1, 2, 3, 4];
  // var obj22 = [2, 3, 4];

  // t.ok(
  //   compare(diff(obj21, obj22), [
  //     {op: 'remove', path: [0]},
  //   ])
  // );

  // // TODO: can be further optimized
  // t.ok(
  //   compare(diff(obj22, obj21), [
  //     {op: 'replace', path: [ 0 ], value: 1},
  //     {op: 'replace', path: [ 1 ], value: 2},
  //     {op: 'replace', path: [ 2 ], value: 3},
  //     {op: 'add', path: [ 3 ], value: 4},
  //   ])
  // );

  // var obj23 = [[5, 4, 5], {a: 4}, {b: 5}, {c: 9, d: 98}];
  // var obj24 = [{b: 5}, {c: 9, d: 98}];

  // t.ok(
  //   compare(diff(obj23, obj24), [
  //     {op: 'remove', path: [ 1 ]},
  //     {op: 'remove', path: [ 0 ]},
  //   ])
  // );

  // // TODO: can be further optimized
  // t.ok(
  //   compare(diff(obj24, obj23), [
  //     {op: 'remove', path: [ 1, 'd' ]},
  //     {op: 'remove', path: [ 1, 'c' ]},
  //     {op: 'remove', path: [ 0, 'b' ]},
  //     {op: 'add', path: [ 0, 0 ], value: 5},
  //     {op: 'add', path: [ 0, 1 ], value: 4},
  //     {op: 'add', path: [ 0, 2 ], value: 5},
  //     {op: 'add', path: [ 1, 'a' ], value: 4},
  //     {op: 'add', path: [ 2 ], value: {b: 5}},
  //     {op: 'add', path: [ 3 ], value: {c: 9, d: 98}},
  //   ])
  // );

  // var obj25 = [{a: 9, b: [1, 2, 3]}];
  // var obj26 = [{a: 9, b: [2, 3]}];

  // t.ok(
  //   compare(diff(obj25, obj26), [ {op: 'remove', path: [ 0, 'b', 0 ]} ])
  // );

  // // TODO: can be further optimized
  // t.ok(
  //   compare(diff(obj26, obj25), [
  //     {op: 'replace', path: [ 0, 'b', 0 ], value: 1},
  //     {op: 'replace', path: [ 0, 'b', 1 ], value: 2},
  //     {op: 'add', path: [ 0, 'b', 2 ], value: 3},
  //   ])
  // );

  // var objx = [['a', 'b', 'c'], 3, 4, 5];
  // var objy = [['b', 'c'], 3, 4];

  // console.log('-----', diff(objx, objy));

  var obj27 = [1, ['a', 'b', 'c'], 3, 4];
  var obj28 = [['b', 'c'], 3, 4];

  console.log('**********', diff(obj27, obj28));

  t.ok(
    compare(diff(obj27, obj28), [ {op: 'remove', path: [ 0, 'b', 0 ]} ])
  );

  t.ok(
    compare(diff(obj28, obj27), [ {op: 'remove', path: [ 0, 'b', 0 ]} ])
  );
});

test('flat objects using jsPatchStandard', function(t) {
  t.plan(6);

  var obj1 = {a: 4, b: 5};
  var obj2 = {a: 3, b: 5};
  var obj3 = {a: 4, c: 5};

  t.ok(
    compare(diff(obj1, obj2, jsonPatchPathConverter), [
      {op: 'replace', path: '/a', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj2, obj1, jsonPatchPathConverter), [
      {op: 'replace', path: '/a', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj1, obj3, jsonPatchPathConverter), [
      {op: 'remove', path: '/b'},
      {op: 'add', path: '/c', value: 5},
    ])
  );
  t.ok(
    compare(diff(obj3, obj1, jsonPatchPathConverter), [
      {op: 'remove', path: '/c'},
      {op: 'add', path: '/b', value: 5},
    ])
  );
  t.ok(
    compare(diff(obj2, obj3, jsonPatchPathConverter), [
      {op: 'remove', path: '/b'},
      {op: 'replace', path: '/a', value: 4},
      {op: 'add', path: '/c', value: 5},
    ])
  );
  t.ok(
    compare(diff(obj3, obj2, jsonPatchPathConverter), [
      {op: 'remove', path: '/c'},
      {op: 'replace', path: '/a', value: 3},
      {op: 'add', path: '/b', value: 5},
    ])
  );
});

test('objects with array properties using jsPatchStandard', function(t) {
  t.plan(6);

  var obj4 = {a: 4, b: [1, 2, 3]};
  var obj5 = {a: 3, b: [1, 2, 4]};
  var obj6 = {a: 3, b: [1, 2, 4, 5]};

  t.ok(
    compare(diff(obj4, obj5, jsonPatchPathConverter), [
      {op: 'replace', path: '/a', value: 3},
      {op: 'replace', path: '/b/2', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj5, obj4, jsonPatchPathConverter), [
      {op: 'replace', path: '/a', value: 4},
      {op: 'replace', path: '/b/2', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj4, obj6, jsonPatchPathConverter), [
      {op: 'replace', path: '/a', value: 3},
      {op: 'replace', path: '/b/2', value: 4},
      {op: 'add', path: '/b/3', value: 5},
    ])
  );
  t.ok(
    compare(diff(obj6, obj4, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/3'},
      {op: 'replace', path: '/a', value: 4},
      {op: 'replace', path: '/b/2', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj5, obj6, jsonPatchPathConverter), [
      {op: 'add', path: '/b/3', value: 5},
    ])
  );
  t.ok(
    compare(diff(obj6, obj5, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/3'},
    ])
  );
});

test('nested objects using jsPatchStandard', function(t) {
  t.plan(8);

  var obj7 = {a: 4, b: {c: 3}};
  var obj8 = {a: 4, b: {c: 4}};
  var obj9 = {a: 5, b: {d: 4}};
  var obj10 = {a: 4};
  var obj11 = {a: 4, b: {c: 4}};

  t.ok(
    compare(diff(obj7, obj8, jsonPatchPathConverter), [
      {op: 'replace', path: '/b/c', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj8, obj7, jsonPatchPathConverter), [
      {op: 'replace', path: '/b/c', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj7, obj9, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/c'},
      {op: 'replace', path: '/a', value: 5},
      {op: 'add', path: '/b/d', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj9, obj7, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/d'},
      {op: 'replace', path: '/a', value: 4},
      {op: 'add', path: '/b/c', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj8, obj9, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/c'},
      {op: 'replace', path: '/a', value: 5},
      {op: 'add', path: '/b/d', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj9, obj8, jsonPatchPathConverter), [
      {op: 'remove', path: '/b/d'},
      {op: 'replace', path: '/a', value: 4},
      {op: 'add', path: '/b/c', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj10, obj11, jsonPatchPathConverter), [
      {op: 'add', path: '/b', value: {c: 4}},
    ])
  );
  t.ok(
    compare(diff(obj11, obj10, jsonPatchPathConverter), [
      {op: 'remove', path: '/b'},
    ])
  );
});

test('arrays using jsPatchStandard', function(t) {
  t.plan(8);

  var obj12 = ['a', {a: 2}, 'c'];
  var obj13 = ['a', {a: 3}, 'd'];
  var obj14 = ['b', {b: 3}, 'd', 'e'];
  var obj14a = ['a', 'b', {b: 3}, 'd', 'e'];

  t.ok(
    compare(diff(obj12, obj13, jsonPatchPathConverter), [
      {op: 'replace', path: '/1/a', value: 3},
      {op: 'replace', path: '/2', value: 'd'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj12, jsonPatchPathConverter), [
      {op: 'replace', path: '/1/a', value: 2},
      {op: 'replace', path: '/2', value: 'c'},
    ])
  );
  t.ok(
    compare(diff(obj12, obj14, jsonPatchPathConverter), [
      {op: 'remove', path: '/1/a'},
      {op: 'replace', path: '/0', value: 'b'},
      {op: 'replace', path: '/2', value: 'd'},
      {op: 'add', path: '/1/b', value: 3},
      {op: 'add', path: '/3', value: 'e'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj14, jsonPatchPathConverter), [
      {op: 'remove', path: '/1/a'},
      {op: 'replace', path: '/0', value: 'b'},
      {op: 'add', path: '/1/b', value: 3},
      {op: 'add', path: '/3', value: 'e'},
    ])
  );
  t.ok(
    compare(diff(obj13, obj14, jsonPatchPathConverter), [
      {op: 'remove', path: '/1/a'},
      {op: 'replace', path: '/0', value: 'b'},
      {op: 'add', path: '/1/b', value: 3},
      {op: 'add', path: '/3', value: 'e'},
    ])
  );

  t.ok(
    compare(diff(obj14, obj13, jsonPatchPathConverter), [
      {op: 'remove', path: '/0'},
      {op: 'replace', path: '/0', value: 'a'},
      {op: 'replace', path: '/1', value: {a: 3}},
      {op: 'replace', path: '/2', value: 'd'},
    ])
  );

  t.ok(
    compare(diff(obj14, obj14a, jsonPatchPathConverter), [
      {op: 'replace', path: '/0', value: 'a'},
      {op: 'replace', path: '/1', value: 'b'},
      {op: 'replace', path: '/2', value: {b: 3}},
      {op: 'replace', path: '/3', value: 'd'},
      {op: 'add', path: '/4', value: 'e'},
    ])
  );

  t.ok(
    compare(diff(obj14a, obj14, jsonPatchPathConverter), [
      {op: 'remove', path: '/0'},
    ])
  );
});

test('object vs array using jsPatchStandard', function(t) {
  t.plan(2);

  var obj15 = {a: 2};
  var obj16 = ['a', 2];

  t.ok(
    compare(diff(obj15, obj16, jsonPatchPathConverter), [
      {op: 'remove', path: '/a'},
      {op: 'add', path: '/0', value: 'a'},
      {op: 'add', path: '/1', value: 2},
    ])
  );
  t.ok(
    compare(diff(obj16, obj15, jsonPatchPathConverter), [
      {op: 'remove', path: '/1'},
      {op: 'remove', path: '/0'},
      {op: 'add', path: '/a', value: 2},
    ])
  );
});

test('round trip using jsPatchStandard', function(t) {
  t.plan(5);

  var obj15 = [1, 2, 3, 4, 5, 16, 17];
  var obj16 = [2, 3];

  var thisDiff = diff(obj15, obj16, jsonPatchPathConverter);
  diffApply(obj15, thisDiff, jsonPatchApplier);
  t.ok(compare(obj15, obj16));

  var obj15a = [1, 2, 3, 4, 5, 16, 17];
  var obj16a = [2, 3];

  thisDiff = diff(obj16a, obj15a, jsonPatchPathConverter);
  diffApply(obj16a, thisDiff, jsonPatchApplier);
  t.ok(compare(obj15a, obj16a));

  var obj17 = {a: [1, 2], b: {c: 3, d: 4, f: [23, 'l']}};
  var obj18 = {c: [1, 2], e: {c: 5, e: 1, f: [23, 'l', 'x']}};

  var thisDiff = diff(obj17, obj18, jsonPatchPathConverter);
  diffApply(obj17, thisDiff, jsonPatchApplier);
  t.ok(compare(obj17, obj18));

  var obj17a = {a: [1, 2], b: {c: 3, d: 4, f: [23, 'l']}};
  var obj18a = {c: [1, 2], e: {c: 5, e: 1, f: [23, 'l', 'x']}};

  thisDiff = diff(obj18a, obj17a, jsonPatchPathConverter);
  diffApply(obj18a, thisDiff, jsonPatchApplier);
  t.ok(compare(obj17a, obj18a));

  var obj17b = [{a: 9, b: [1, 2, 3]}];
  var obj18b = [{a: 9, b: [2, 3]}];

  thisDiff = diff(obj18b, obj17b);
  diffApply(obj18b, thisDiff);
  t.ok(compare(obj17b, obj18b));
});

test('nested objects using custom converter', function(t) {
  t.plan(8);

  var converter = function(path) {
    return path.join('-');
  };
  var obj1 = {a: 4, b: {c: 3}};
  var obj2 = {a: 4, b: {c: 4}};
  var obj3 = {a: 5, b: {d: 4}};
  var obj4 = {a: 4};
  var obj5 = {a: 4, b: {c: 4}};

  t.ok(
    compare(diff(obj1, obj2, converter), [
      {op: 'replace', path: 'b-c', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj2, obj1, converter), [
      {op: 'replace', path: 'b-c', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj1, obj3, converter), [
      {op: 'remove', path: 'b-c'},
      {op: 'replace', path: 'a', value: 5},
      {op: 'add', path: 'b-d', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj3, obj1, converter), [
      {op: 'remove', path: 'b-d'},
      {op: 'replace', path: 'a', value: 4},
      {op: 'add', path: 'b-c', value: 3},
    ])
  );
  t.ok(
    compare(diff(obj2, obj3, converter), [
      {op: 'remove', path: 'b-c'},
      {op: 'replace', path: 'a', value: 5},
      {op: 'add', path: 'b-d', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj3, obj2, converter), [
      {op: 'remove', path: 'b-d'},
      {op: 'replace', path: 'a', value: 4},
      {op: 'add', path: 'b-c', value: 4},
    ])
  );
  t.ok(
    compare(diff(obj4, obj5, converter), [
      {op: 'add', path: 'b', value: {c: 4}},
    ])
  );
  t.ok(compare(diff(obj5, obj4, converter), [{op: 'remove', path: 'b'}]));
});

test('invalid inputs', function(t) {
  t.plan(6);

  t.throws(function() {
    compare(diff(null, null));
  });
  t.throws(function() {
    compare(diff(undefined, undefined));
  });
  t.throws(function() {
    compare(diff({a: 2}, undefined));
  });
  t.throws(function() {
    compare(diff(null, {b: 4}));
  });
  t.throws(function() {
    compare(diff(7, 6));
  });
  t.throws(function() {
    compare(
      diff(function(a, b) {
        return a + b;
      }, 6)
    );
  });
});
