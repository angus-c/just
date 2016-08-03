var test = require('tape');
var objectEmpty = require('../../packages/object-empty');

test('find that an object is empty', function (t) {
  t.plan(1);
  var obj = objectEmpty({});
  t.equal(obj, true);
  t.end();
});

test('find that an null object is empty', function (t) {
  t.plan(1);
  var obj = objectEmpty(null);
  t.equal(obj, true);
  t.end();
});

test('find that an object is not empty', function (t) {
  t.plan(1);
  var obj = objectEmpty({foo: 'bar'});
  t.equal(obj, false);
  t.end();
});
