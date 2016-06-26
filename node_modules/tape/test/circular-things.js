var tape = require('../');
var tap = require('tap');
var concat = require('concat-stream');

tap.test('circular test', function (assert) {
    var test = tape.createHarness({ exit : false });
    assert.plan(1);

    test.createStream().pipe(concat(function (body) {
        assert.equal(
            body.toString('utf8'),
            'TAP version 13\n'
            + '# circular\n'
            + 'not ok 1 should be equal\n'
            + '  ---\n'
            + '    operator: equal\n'
            + '    expected: |-\n'
            + '      {}\n'
            + '    actual: |-\n'
            + '      { circular: [Circular] }\n'
            + '  ...\n'
            + '\n'
            + '1..1\n'
            + '# tests 1\n'
            + '# pass  0\n'
            + '# fail  1\n'
        );
    }));

    test("circular", function (t) {
        t.plan(1);
        var circular = {};
        circular.circular = circular;
        t.equal(circular, {});
    })
})
