var test = require('../util/test')(__filename);
var get = require('../../packages/object-safe-get');
var compare = require('../../packages/collection-compare');

test('returns existing properties using dot-notation arg', function (t) {
  t.plan(6);
  var obj = { a: { aa: { aaa: 2 } }, b: 4 };
  t.ok(compare(get(obj, 'a'), { aa: { aaa: 2 } }));
  t.ok(compare(get(obj, 'a.aa'), { aaa: 2 }));
  t.ok(compare(get(obj, 'a.aa.aaa'), 2));
  t.ok(compare(get(obj, 'b'), 4));
  t.ok(compare(get(obj.a, 'aa'), { aaa: 2 }));
  t.ok(compare(get(obj.a.aa, 'aaa'), 2));
  t.end();
});

test('returns existing properties using array arg', function (t) {
  t.plan(6);
  var obj = { a: { aa: { aaa: 2 } }, b: 4 };
  t.ok(compare(get(obj, ['a']), { aa: { aaa: 2 } }));
  t.ok(compare(get(obj, ['a', 'aa']), { aaa: 2 }));
  t.ok(compare(get(obj, ['a', 'aa', 'aaa']), 2));
  t.ok(compare(get(obj, ['b']), 4));
  t.ok(compare(get(obj.a, ['aa']), { aaa: 2 }));
  t.ok(compare(get(obj.a.aa, ['aaa']), 2));
  t.end();
});

test('returns undefined for non-existing properties, using dot-notation arg', function (t) {
  t.plan(3);
  var obj = { a: { aa: { aaa: 2 } }, b: 4 };
  t.ok(compare(get(obj, 'b.bb'), undefined));
  t.ok(compare(get(obj, 'b.bb.bbb'), undefined));
  t.ok(compare(get(obj.b, 'bb.bbb'), undefined));
  t.end();
});

test('returns undefined for non-existing properties, using array arg', function (t) {
  t.plan(3);
  var obj = { a: { aa: { aaa: 2 } }, b: 4 };
  t.ok(compare(get(obj, ['b', 'bb']), undefined));
  t.ok(compare(get(obj, ['b', 'bb', 'bbb']), undefined));
  t.ok(compare(get(obj.b, ['bb', 'bbb']), undefined));
  t.end();
});
