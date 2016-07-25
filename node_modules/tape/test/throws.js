var tape = require('../');
var tap = require('tap');
var concat = require('concat-stream');

function fn() {
    throw new TypeError('RegExp');
}

function getNonFunctionMessage(fn) {
    try {
        fn();
    } catch (e) {
        return e.message;
    }
}

tape('throws', function (t) {
    t.throws(fn);
    t.end();
});

tape('throws (RegExp match)', function (t) {
    t.throws(fn, /RegExp/, 'regex with no anchors');
    t.throws(fn, /^TypeError: Reg/, 'regex with starting anchor');
    t.throws(fn, /RegExp$/, 'regex with ending anchor');
    t.throws(fn, /^TypeError: RegExp$/, 'regex with both anchors');
    t.end();
});

tape('throws (Function match)', function (t) {
    t.throws(fn, TypeError);
    t.end();
});

tap.test('failures', function (tt) {
    tt.plan(1);

    var test = tape.createHarness();
    test.createStream().pipe(concat(function (body) {
        tt.equal(
            body.toString('utf8'),
            'TAP version 13\n'
           + '# non functions\n'
           + 'not ok 1 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage() + "] message: '" + getNonFunctionMessage() + "' }\n"
           + '  ...\n'
           + 'not ok 2 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage(null) + "] message: '" + getNonFunctionMessage(null) + "' }\n"
           + '  ...\n'
           + 'not ok 3 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage(true) + "] message: '" + getNonFunctionMessage(true) + "' }\n"
           + '  ...\n'
           + 'not ok 4 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage(false) + "] message: '" + getNonFunctionMessage(false) + "' }\n"
           + '  ...\n'
           + 'not ok 5 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage('abc') + "] message: '" + getNonFunctionMessage('abc') + "' }\n"
           + '  ...\n'
           + 'not ok 6 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage(/a/g) + "] message: '" + getNonFunctionMessage(/a/g) + "' }\n"
           + '  ...\n'
           + 'not ok 7 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage([]) + "] message: '" + getNonFunctionMessage([]) + "' }\n"
           + '  ...\n'
           + 'not ok 8 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: |-\n'
           + '      undefined\n'
           + '    actual: |-\n'
           + "      { [TypeError: " + getNonFunctionMessage({}) + "] message: '" + getNonFunctionMessage({}) + "' }\n"
           + '  ...\n'
           + '# function\n'
           + 'not ok 9 should throw\n'
           + '  ---\n'
           + '    operator: throws\n'
           + '    expected: undefined\n'
           + '    actual:   undefined\n'
           + '  ...\n\n'
           + '1..9\n'
           + '# tests 9\n'
           + '# pass  0\n'
           + '# fail  9\n'
        );
    }));

    test('non functions', function (t) {
        t.plan(8);
        t.throws();
        t.throws(null);
        t.throws(true);
        t.throws(false);
        t.throws('abc');
        t.throws(/a/g);
        t.throws([]);
        t.throws({});
    });

    test('function', function (t) {
        t.plan(1);
        t.throws(function () {});
    });
});
