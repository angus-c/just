var tap = require('tap');
var spawn = require('child_process').spawn;
var trim = require('string.prototype.trim');

tap.test('default messages', function (t) {
    t.plan(1);

    var tc = tap.createConsumer();

    var rows = [];
    tc.on('data', function (r) { rows.push(r) });
    tc.on('end', function () {
        var rs = rows.map(function (r) {
            if (r && typeof r === 'object') {
                return { id : r.id, ok : r.ok, name : trim(r.name) };
            }
            else return r;
        });
        t.same(rs, [
            'TAP version 13',
            'default messages',
            { id: 1, ok: true, name: 'should be truthy' },
            { id: 2, ok: true, name: 'should be falsy' },
            { id: 3, ok: true, name: 'should be equal' },
            { id: 4, ok: true, name: 'should not be equal' },
            { id: 5, ok: true, name: 'should be equivalent' },
            { id: 6, ok: true, name: 'should be equivalent' },
            { id: 7, ok: true, name: 'should be equivalent' },
            'tests 7',
            'pass  7',
            'ok'
        ]);
    });

    var ps = spawn(process.execPath, [ __dirname + '/messages/defaults.js' ]);
    ps.stdout.pipe(tc);
});
