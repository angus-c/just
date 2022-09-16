const upsert = require('../../packages/array-upsert');
const test = require('../util/test')(__filename);

test('Basic', function(t) {
  t.plan(2);

  var input = [1, 2, 3, 4];
  var result = upsert(input, -1, 2);
  t.deepEqual(result, [1, 2, -1, 4]);
  t.notDeepEqual(input, result); // Check input was not mutated

  t.end();
});

test('Upsert to first/last index', function(t) {
  t.plan(4);

  var input = ['a', 'b', 'c', 'd'];
  var firstIndexResult = upsert(input, 'a+', 0);
  var lastIndexResult = upsert(input, 'd+', 3);
  t.deepEqual(firstIndexResult, ['a+', 'b', 'c', 'd']);
  t.deepEqual(lastIndexResult, ['a', 'b', 'c', 'd+']);
  t.notDeepEqual(input, firstIndexResult);
  t.notDeepEqual(input, lastIndexResult);

  t.end();
});

test('Target index outside of input', function(t) {
  t.plan(4);

  var input = ['a', 'b', 'c', 'd'];
  var justOutsideResult = upsert(input, 'd+', 4);
  var veryFarOutResult = upsert(input, 'd++', 9999999);

  t.deepEqual(justOutsideResult, ['a', 'b', 'c', 'd', 'd+']);
  t.deepEqual(veryFarOutResult, ['a', 'b', 'c', 'd', 'd++']);
  t.notDeepEqual(input, justOutsideResult);
  t.notDeepEqual(input, veryFarOutResult);

  t.end();
});

test('Negative target index', function(t) {
  t.plan(4);

  var input = [0, 1, 2, 3, 4];
  var smallNegativeResult = upsert(input, 'a', -1);
  var largeNegativeResult = upsert(input, 'b', -99999);

  t.deepEqual(smallNegativeResult, [0, 1, 2, 3, 4, 'a']);
  t.deepEqual(largeNegativeResult, [0, 1, 2, 3, 4, 'b']);
  t.notDeepEqual(input, smallNegativeResult);
  t.notDeepEqual(input, largeNegativeResult);

  t.end();
});

test('Empty input array', function(t) {
  t.plan(2);

  var input = [];
  var result = upsert(input, new Date(1), 0);

  t.deepEqual(result, [new Date(1)]);
  t.notDeepEqual(input, result);

  t.end();
});

test('Objects', function(t) {
  t.plan(4);

  var input = [
    {
      'J': 131234188,
      '': {
        'h': 425294562,
        'V': '',
      },
    },
    {
      '&': false,
      m: {
        '': true,
        '&a': 'H=',
      },
    },
    {
      ",]'": '',
      '4~': true,
    },
  ];
  var updateResult = upsert(input, {
    '#': -1303827106,
    'Q=': '',
  }, 1);
  var pushResult = upsert(input, {
    '1': -867336401.0513263,
    'If': true,
  }, 8);

  t.deepEqual(updateResult, [
    {
      'J': 131234188,
      '': {
        'h': 425294562,
        'V': '',
      },
    },
    {
      '#': -1303827106,
      'Q=': '',
    },
    {
      ",]'": '',
      '4~': true,
    },
  ]);
  t.deepEqual(pushResult, [
    {
      'J': 131234188,
      '': {
        'h': 425294562,
        'V': '',
      },
    },
    {
      '&': false,
      m: {
        '': true,
        '&a': 'H=',
      },
    },
    {
      ",]'": '',
      '4~': true,
    },
    {
      '1': -867336401.0513263,
      'If': true,
    },
  ]);
  t.notDeepEqual(input, updateResult);
  t.notDeepEqual(input, pushResult);

  t.end();
});

test('Arrays', function(t) {
  t.plan(2);

  var input = [
    [
      '',
      {
        '': true,
        Hb: true,
      },
    ],
    [true, false],
    [-1134375265.6151595],
  ];

  var updateResult = upsert(input, [12, 34], 1);

  t.deepEqual(updateResult, [
    [
      '',
      {
        '': true,
        Hb: true,
      },
    ],
    [12, 34],
    [-1134375265.6151595],
  ]);
  t.notDeepEqual(input, updateResult);

  t.end();
});

test('Update with empty array/object', function(t) {
  t.plan(4);

  var arrayInput = [[1, 2], ['asf', 'ar'], []];
  var objectInput = [{a: 1}, {b: 2}, {}];

  var arrayResult = upsert(arrayInput, [], 1);
  var objectResult = upsert(objectInput, {}, 1);

  t.deepEqual(arrayResult, [[1, 2], [], []]);
  t.deepEqual(objectResult, [{a: 1}, {}, {}]);
  t.notDeepEqual(arrayInput, arrayResult);
  t.notDeepEqual(objectInput, objectResult);

  t.end();
});

test('Errors', function(t) {
  t.plan(11);

  t.comment('non-arrays as first param');
  t.throws(() => upsert(null, 'a'), 0);
  t.throws(() => upsert(null, 5), -100);
  t.throws(() => upsert(2, 5), 60);
  t.throws(() => upsert('a', 5), 1);

  t.comment('object as first param');
  t.throws(() => upsert({}, 5), 2);

  t.comment('non-number target indexes');
  t.throws(() => upsert([1, 3], 5, 'a'), 2);
  t.throws(() => upsert([1, 3], 5, new Date()), 2);
  t.throws(() => upsert([1, 3], 5, {}), 2);
  t.throws(() => upsert([1, 3], 5, []), 2);

  t.comment('not enough parameters');
  t.throws(() => upsert([]));
  t.throws(() => upsert());

  t.end();
});
