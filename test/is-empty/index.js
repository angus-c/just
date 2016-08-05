var test = require('tape');
var isObjectEmpty = require('../../packages/object-is-empty');

test('find that an object is empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty({});
  t.equal(obj, true);
  t.end();
});

test('find that an null object is empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty(null);
  t.equal(obj, true);
  t.end();
});

test('find that an object is not empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty({foo: 'bar'});
  t.equal(obj, false);
  t.end();
});

test('find that an array is empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty([]);
  t.equal(obj, true);
  t.end();
});

test('find that an array is not empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty(['bar']);
  t.equal(obj, false);
  t.end();
});

test('find that undefined is empty', function (t) {
  t.plan(1);
  var obj = isObjectEmpty(undefined);
  t.equal(obj, true);
  t.end();
});
