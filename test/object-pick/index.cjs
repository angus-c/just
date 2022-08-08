var test = require('../util/test')(__filename);
var pick = require('../../packages/object-pick');
var compare = require('../../packages/collection-compare');

// var obj = {a: 3, b: 5, c: 9};
// pick(obj, a, c); // {a: 3, c: 9}
//
// var obj = {a: 3, b: 5, c: 9};
// pick(obj, ['a', 'b', 'd']); // {a: 3, b: 5, d: undefined}
//
// var obj = {a: 3, b: 5, c: 9};
// pick(obj, ['a', 'a']); // {a: 3}

test('pick returns new object', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(pick(obj, []) !== obj);
  t.end();
});

test('pick using array', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(pick(obj, ['a', 'c']), {a: 3, c: 9}));
  t.end();
});

test('pick using arguments', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(pick(obj, 'a', 'c'), {a: 3, c: 9}));
  t.end();
});

test('pick using a non-existent key', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(pick(obj, ['a', 'b', 'd']), {a: 3, b: 5}));
  t.end();
});

test('pick using a duplicate key', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(pick(obj, ['a', 'a']), {a: 3}));
  t.end();
});

test('pick where obj has a function value', function(t) {
  t.plan(1);
  var fn = function() {
    return true;
  };
  var obj = {
    a: 3,
    b: fn,
  };
  t.ok(
    compare(pick(obj, 'b'), {
      b: fn,
    })
  );
  t.end();
});
