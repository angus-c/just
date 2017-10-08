var ts = require('../..');
var test = require('tapes');
var format = require('chalk');
var symbols = {
    ok: '\u2713',
    err: '\u2717'
};
var rs = null;
var actual = null;
var tapSpec = null;

test('unit test', function(t) {
    t.beforeEach(function(t) {
        rs = require('stream').Readable();
        rs._read = function noop() {};
        actual = '';
        tapSpec = ts();
        tapSpec.on('data', function(data) {
            actual += data.toString();
        });
        t.end();
    });

    t.test('Parsing comment', function(t) {
        t.plan(1);
        var comment = '# This is a comment\n';
        var expected = '\n  This is a comment\n\n';

        rs.on('end', function() {
            t.equal(actual, expected, 'Should format comment correctly.');
        });

        rs.pipe(tapSpec);
        rs.push(comment);
        rs.push(null);
    });

    t.test('Assert ok', function(t) {
        t.plan(1);
        var assert = 'ok 1 this is an ok assertion\n';
        var expected = '    ' + format.green(symbols.ok) + ' ' + format.gray('this is an ok assertion') + '\n';

        rs.on('end', function() {
            t.equal(actual, expected, 'Should format ok assertion correctly.');
        });

        rs.pipe(tapSpec);
        rs.push(assert);
        rs.push(null);
    });

    t.test('Assert not ok', function(t) {
        t.plan(1);
        var assert = 'not ok 1 this is a not-ok assertion\n';
        var expected = '    ' + format.red(symbols.err) + ' ' + format.gray('this is a not-ok assertion') + '\n';

        rs.on('end', function() {
            t.equal(actual, expected, 'Should format not-ok assertion correctly.');
        });

        rs.pipe(tapSpec);
        rs.push(assert);
        rs.push(null);
    });

    t.test('Extra', function(t) {
        t.plan(1);
        var extra = 'something extra that does not match any other regex\n';
        var expected = '   ' + format.yellow('something extra that does not match any other regex') + '\n';

        rs.on('end', function() {
            t.equal(actual, expected, 'Should format extra correctly.');
        });

        rs.pipe(tapSpec);
        rs.push(extra);
        rs.push(null);
    });

    t.end();
});
