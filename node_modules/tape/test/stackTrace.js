var tape = require('../');
var tap = require('tap');
var concat = require('concat-stream');
var tapParser = require('tap-parser');
var yaml = require('js-yaml');

tap.test('preserves stack trace with newlines', function (tt) {
    tt.plan(3);

    var test = tape.createHarness();
    var stream = test.createStream();
    var parser = stream.pipe(tapParser());
    var stackTrace = 'foo\n  bar';

    parser.once('assert', function (data) {
        tt.deepEqual(data, {
            ok: false,
            id: 1,
            name: "Error: Preserve stack",
            diag: {
                stack: stackTrace,
                operator: 'error',
                expected: 'undefined',
                actual: '[Error: Preserve stack]'
            }
        });
    });

    stream.pipe(concat(function (body) {
        var body = body.toString('utf8')
        tt.equal(
            body,
            'TAP version 13\n'
            + '# multiline stack trace\n'
            + 'not ok 1 Error: Preserve stack\n'
            + '  ---\n'
            + '    operator: error\n'
            + '    expected: |-\n'
            + '      undefined\n'
            + '    actual: |-\n'
            + '      [Error: Preserve stack]\n'
            + '    stack: |-\n'
            + '      foo\n'
            + '        bar\n'
            + '  ...\n'
            + '\n'
            + '1..1\n'
            + '# tests 1\n'
            + '# pass  0\n'
            + '# fail  1\n'
        );

        tt.deepEqual(getDiag(body), {
            stack: stackTrace,
            operator: 'error',
            expected: 'undefined',
            actual: '[Error: Preserve stack]'
        });
    }));

    test('multiline stack trace', function (t) {
        t.plan(1);
        var err = new Error('Preserve stack');
        err.stack = stackTrace;
        t.error(err);
    });
});

tap.test('preserves stack trace for failed assertions', function (tt) {
    tt.plan(5);

    var test = tape.createHarness();
    var stream = test.createStream();
    var parser = stream.pipe(tapParser());

    var stack = ''
    parser.once('assert', function (data) {
        tt.equal(typeof data.diag.stack, 'string')
        stack = data.diag.stack || ''
        tt.ok(/^Error: false should be true(\n    at .+)+/.exec(stack), 'stack should be a stack')
        tt.deepEqual(data, {
            ok: false,
            id: 1,
            name: "false should be true",
            diag: {
                stack: stack,
                operator: 'equal',
                expected: false,
                actual: true
            }
        });
    });

    stream.pipe(concat(function (body) {
        var body = body.toString('utf8')
        tt.equal(
            body,
            'TAP version 13\n'
            + '# t.equal stack trace\n'
            + 'not ok 1 false should be true\n'
            + '  ---\n'
            + '    operator: equal\n'
            + '    expected: false\n'
            + '    actual:   true\n'
            + '    stack: |-\n'
            + '      '
            + stack.replace(/\n/g, '\n      ') + '\n'
            + '  ...\n'
            + '\n'
            + '1..1\n'
            + '# tests 1\n'
            + '# pass  0\n'
            + '# fail  1\n'
        );

        tt.deepEqual(getDiag(body), {
            stack: stack,
            operator: 'equal',
            expected: false,
            actual: true
        });
    }));

    test('t.equal stack trace', function (t) {
        t.plan(1);
        t.equal(true, false, 'false should be true');
    });
});

function getDiag (body) {
    var yamlStart = body.indexOf('  ---');
    var yamlEnd = body.indexOf('  ...\n');
    var diag = body.slice(yamlStart, yamlEnd).split('\n').map(function (line) {
        return line.slice(2);
   }).join('\n');

   return yaml.safeLoad(diag);
}
