var tap = require('tap');
var spawn = require('child_process').spawn;
var trim = require('string.prototype.trim');

tap.test('requiring a single module', function (t) {
    t.plan(2);
    
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
            'module-a',
            { id: 1, ok: true, name: 'loaded module a' },
            'test-a',
            { id: 2, ok: true, name: 'module-a loaded in same context'},
            { id: 3, ok: true, name: 'test ran after module-a was loaded'},
            'tests 3',
            'pass  3',
            'ok'
        ]);
    });
    
    var ps = tape('-r ./require/a require/test-a.js');
    ps.stdout.pipe(tc);
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});

tap.test('requiring multiple modules', function (t) {
    t.plan(2);
    
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
            'module-a',
            { id: 1, ok: true, name: 'loaded module a' },
            'module-b',
            { id: 2, ok: true, name: 'loaded module b' },
            'test-a',
            { id: 3, ok: true, name: 'module-a loaded in same context'},
            { id: 4, ok: true, name: 'test ran after module-a was loaded'},
            'test-b',
            { id: 5, ok: true, name: 'module-b loaded in same context'},
            { id: 6, ok: true, name: 'test ran after module-b was loaded'},
            'tests 6',
            'pass  6',
            'ok'
        ]);
    });
    
    var ps = tape('-r ./require/a -r ./require/b require/test-a.js require/test-b.js');
    ps.stdout.pipe(tc);
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});

function tape(args) {
  var proc = require('child_process')
  var bin = __dirname + '/../bin/tape'

  return proc.spawn(bin, args.split(' '), { cwd: __dirname })
}