var test = require('tape');
var omit = require('../../packages/object-omit');
var compare = require('../../packages/collection-compare');

// var obj = {a: 3, b: 5, c: 9};
// omit(obj, a, c); // {b: 5}
//
// var obj = {a: 3, b: 5, c: 9};
// omit(obj, ['a', 'b', 'd']); // {c: 9}
//
// var obj = {a: 3, b: 5, c: 9};
// omit(obj, ['a', 'a']); // {b: 5, c: 9}

test('omit using array', function (t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'c']), {b: 5}));
  t.end();
});

test('omit using arguments', function (t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, 'a', 'c'), {b: 5}));
  t.end();
});

test('omit using a non-existent key', function (t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'b', 'd']), {c: 9}));
  t.end();
});

test('omit using a duplicate key', function (t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'a']), {b: 5, c: 9}));
  t.end();
});
