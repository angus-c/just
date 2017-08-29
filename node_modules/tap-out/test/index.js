var parser = require('../');
var test = require('tape');

test('output event', function (t) {

  t.plan(1);

  var mockTap = [
    '# is true',
    'ok 1 true value',
    'ok 2 true value',
    '1..2'
  ];

  var p = parser();

  p.on('output', function (output) {

    t.deepEqual(output, {
      asserts: [
        { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
        { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
      ],
      fail: [],
      pass: [
        { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
        { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
      ],
      results: [],
      tests: [
        { name: 'is true', number: 1, raw: '# is true', type: 'test' }
      ],
      versions: [],
      comments: [],
      plans: [{ from: 1, to: 2, raw: '1..2', skip: undefined, type: 'plan' }]
    }, 'output data');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('output callback', function (t) {

  t.plan(1);

  var mockTap = [
    '# is true',
    'ok 1 true value',
    'ok 2 true value',
    '1..2'
  ];

  var p = parser(function (err, output) {

    t.deepEqual(output, {
      asserts: [
        { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
        { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
      ],
      fail: [],
      pass: [
        { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
        { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
      ],
      results: [],
      tests: [
        { name: 'is true', number: 1, raw: '# is true', type: 'test' }
      ],
      versions: [],
      comments: [],
      plans: [{ from: 1, to: 2, raw: '1..2', skip: undefined, type: 'plan' }]
    }, 'output data');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('tests', function (t) {

  t.plan(1);

  var mockTap = [
    '# is true',
    'ok 1 true value',
    'ok 2 true value'
  ];

  var p = parser();

  p.on('test', function (test) {

    t.deepEqual(test, {
      type: 'test',
      name: 'is true',
      raw: '# is true',
      number: 1
    }, 'test is parsed');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('asserts', function (t) {

  t.plan(2);

  var mockTap = [
    '# is true',
    'ok 1 true value',
    'ok 2 true value'
  ];

  var p = parser();

  var asserts = [];
  p.on('assert', function (assert) {
    asserts.push(assert);
  });

  p.on('output', function () {

    t.deepEqual(asserts[0], {
      name: 'true value',
      number: 1,
      ok: true,
      raw: 'ok 1 true value',
      test: 1,
      type: 'assert'
    }, 'assert 1')
    t.deepEqual(asserts[1], {
      name: 'true value',
      number: 2,
      ok: true,
      raw: 'ok 2 true value',
      test: 1,
      type: 'assert'
    }, 'assert 2')
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('results', function (t) {

  t.plan(3);

  var mockTap = [
    '# tests 15',
    '# pass  13',
    '# fail  2'
  ];

  var p = parser();

  var results = [];
  p.on('result', function (result) {
    results.push(result);
  });

  p.on('output', function () {

    t.deepEqual(results[0], {
      count: '15',
      name: 'tests',
      raw: '# tests 15',
      type: 'result'
    }, 'tests');

    t.deepEqual(results[1], {
      count: '13',
      name: 'pass',
      raw: '# pass  13',
      type: 'result'
    }, 'pass');

    t.deepEqual(results[2], {
      count: '2',
      name: 'fail',
      raw: '# fail  2',
      type: 'result'
    }, 'fail');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('version', function (t) {

  t.plan(1);

  var mockTap = [
    'TAP version 13'
  ];

  var p = parser();

  var results = [];
  p.on('version', function (version) {

    t.deepEqual(version, {
      raw: 'TAP version 13',
      type: 'version'
    }, 'version data');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('pass', function (t) {

  t.plan(2);

  var mockTap = [
    '# is true',
    'ok 1 true value',
    'ok 2 true value'
  ];

  var p = parser();

  var passes = [];
  p.on('pass', function (pass) {

    passes.push(pass);
  });

  p.on('output', function () {

    t.deepEqual(passes[0], {
      name: 'true value',
      number: 1,
      ok: true,
      raw: 'ok 1 true value',
      test: 1,
      type: 'assert'
    }, 'pass 1');

    t.deepEqual(passes[1], {
      name: 'true value',
      number: 2,
      ok: true,
      raw: 'ok 2 true value',
      test: 1,
      type: 'assert'
    }, 'pass 2');
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('failed assertion', function (t) {

  t.plan(1);

  var mockTap = [
    "TAP version 13",
    "# is true",
    "ok 1 true value",
    "ok 2 true value",
    "not ok 3 strings match",
    "  ---",
    "    operator: equal",
    "    expected: 'you'",
    "    actual:   'me'",
    "    at: Test.<anonymous> (/Users/scott/www/divshot/divshot-cli/test/index.js:8:5)",
    "  ...",
    "not ok 15 plan != count",
    "  ---",
    "    operator: fail",
    "    expected: 4",
    "    actual:   3",
    "  ...",
    "",
    "1..15",
  ];

  var fails = [];
  var p = parser(function () {

    t.deepEqual(
      fails,
      [
        {
          error: {
            actual: 'me',
            at: {
              character: '5',
              file: '/Users/scott/www/divshot/divshot-cli/test/index.js',
              line: '8'
            },
            expected: 'you',
            operator: 'equal',
            raw: [
              "    operator: equal",
              "    expected: 'you'",
              "    actual:   'me'",
              "    at: Test.<anonymous> (/Users/scott/www/divshot/divshot-cli/test/index.js:8:5)"
            ].join('\n')
          },
          name: 'strings match',
          number: 3,
          ok: false,
          raw: 'not ok 3 strings match',
          test: 1,
          type: 'assert'
        },
        {
          error: {
            actual: '3',
            expected: '4',
            operator: 'count',
            raw: [
              "    operator: fail",
              "    expected: 4",
              "    actual:   3"
            ].join('\n')
          },
          name: 'plan != count',
          number: 15,
          ok: false,
          raw: 'not ok 15 plan != count',
          test: 1,
          type: 'plan'
        }
      ],
      'fails'
    );
  });

  p.on('fail', function (fail) {

    fails.push(fail);
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('plan', function (t) {

  var mockTap = [
    '1..2',
  ];

  var plans = [];
  var p = parser(function () {
    t.deepEqual(plans, [
      { from: 1, to: 2, raw: '1..2', skip: undefined, type: 'plan' }
    ]);
    t.end();
  });

  p.on('plan', function (plan) {
    plans.push(plan);
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});


// NOTE: comments output the same as test names.
// This makes it very difficult to parse them.
// Ignoring them for now. Just don't use comments.
test('comments');

test('generic output', function (t) {

  var mockTap = [
    "TAP version 13",
    "# is true",
    "ok 1 true value",
    "not ok 2 strings match",
    "  ---",
    "    operator: equal",
    "    expected: 'you'",
    "    actual:   'me'",
    "    at: Test.<anonymous> (/Users/scott/www/divshot/divshot-cli/test/index.js:8:5)",
    "  ...",
    "ok 3 true value",
    "this is a console log",
    "# false values",
    "ok 4 should be false",
    "ok 5 false value"
  ];

  var comments = [];
  var p = parser(function (err, output) {

    t.deepEqual(
      comments,
      [
        {
          type: 'comment',
          raw: 'this is a console log',
          test: 1
        }
      ],
      'one comment'
    );
    t.end();
  });

  p.on('comment', function (comment) {

    comments.push(comment);
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('handles HTTP error source', function (t) {

  t.plan(1);

  var mockTap = [
    "TAP version 13",
    "# is true",
    "ok 1 true value",
    "ok 2 true value",
    "not ok 3 strings match",
    "  ---",
    "    operator: equal",
    "    expected: 'you'",
    "    actual:   'me'",
    "    at: Test.<anonymous> (http://localhost:9966/index.js:8:5)",
    "  ...",
    "not ok 15 plan != count",
    "  ---",
    "    operator: fail",
    "    expected: 4",
    "    actual:   3",
    "  ...",
    "",
    "1..15",
  ];

  var p = parser();

  p.on('output', function (output) {
    var assert = output.fail[0];
    t.deepEqual(assert.error.at, { character: '5', file: 'http://localhost:9966/index.js', line: '8' });
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('handles raw error string', function (t) {

  t.plan(1);

  var rawLines = [
    "    operator: deepEqual",
    "    expected:",
    "      { 0: 0, 1: 0, 10: 0, 11: 255, 12: 0, 13: 0, 14: 0, 15: 255, 2: 0, 3: 221, 4: 0, 5: 0, 6: 0, 7: 255, 8: 0, 9: 0 }",
    "    actual:",
    "      { 0: 0, 1: 0, 10: 0, 11: 255, 12: 0, 13: 0, 14: 0, 15: 255, 2: 0, 3: 255, 4: 0, 5: 0, 6: 0, 7: 255, 8: 0, 9: 0 }",
    "    at: Test.<anonymous> (http://localhost:9966/index.js:8:5)"
  ];

  var mockTap = [
    "TAP version 13",
    "# is true",
    "ok 1 true value",
    "ok 2 true value",
    "not ok 3 arrays match",
    "  ---"
  ].concat(rawLines).concat([
    "  ...",
    "not ok 15 plan != count",
    "  ---",
    "    operator: fail",
    "    expected: 4",
    "    actual:   3",
    "  ...",
    "",
    "1..15",
  ]);

  var p = parser();

  p.on('output', function (output) {
    var assert = output.fail[0];
    t.deepEqual(assert.error.raw, rawLines.join('\n'));
  });

  mockTap.forEach(function (line) {

    p.write(line + '\n');
  });
  p.end();
});

test('handles multiline error string with |-', function (t) {

  t.plan(2);

  var mockTap = [
    "TAP version 13",
    "# is true",
    "ok 1 true value",
    "not ok 2 object deep equal with cross",
    "  ---",
    "    operator: deepEqual",
    "    expected: |-",
    "      { a: 1, b: 2 }",
    "    actual: |-",
    "      { a: 1, b: 3 }",
    "    at: Test.<anonymous> (/Users/germ/Projects/a/b/test.js:7:5)",
    "  ...",
    "",
    "1..2",
  ];

  var p = parser();

  p.on('output', function (output) {
    var assert = output.fail[0];
    t.equal(assert.error.expected, '{ a: 1, b: 2 }');
    t.equal(assert.error.actual, '{ a: 1, b: 3 }');
  });

  mockTap.forEach(function (line) {
    p.write(line + '\n');
  });
  p.end();

});
