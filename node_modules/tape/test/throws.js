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
           + '  ...\n'
           + '# custom error messages\n'
           + 'ok 10 "message" is enumerable\n'
           + "ok 11 { custom: 'error', message: 'message' }\n"
           + 'ok 12 getter is still the same\n'
           + '# throws null\n'
           + 'ok 13 throws null\n'
           + '\n1..13\n'
           + '# tests 13\n'
           + '# pass  4\n'
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

    test('custom error messages', function (t) {
        t.plan(3);
        var getter = function () { return 'message'; };
        var messageGetterError = Object.defineProperty(
            { custom: 'error' },
            'message',
            { configurable: true, enumerable: true, get: getter }
        );
        t.equal(Object.prototype.propertyIsEnumerable.call(messageGetterError, 'message'), true, '"message" is enumerable');
        t.throws(function () { throw messageGetterError; }, "{ custom: 'error', message: 'message' }");
        t.equal(Object.getOwnPropertyDescriptor(messageGetterError, 'message').get, getter, 'getter is still the same');
    });

    test('throws null', function (t) {
      t.plan(1);
      t.throws(function () { throw null; }, 'throws null');
      t.end();
    });
});
