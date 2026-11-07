var test = require('../util/test')(__filename);
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

test('omit returns new object', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(omit(obj, []) !== obj);
  t.end();
});

test('omit using array', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'c']), {b: 5}));
  t.end();
});

test('omit using arguments', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, 'a', 'c'), {b: 5}));
  t.end();
});

test('omit using a non-existent key', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'b', 'd']), {c: 9}));
  t.end();
});

test('omit using a duplicate key', function(t) {
  t.plan(1);
  var obj = {a: 3, b: 5, c: 9};
  t.ok(compare(omit(obj, ['a', 'a']), {b: 5, c: 9}));
  t.end();
});

test('omit where obj has a function value', function(t) {
  t.plan(1);
  var fn = function() {
    return true;
  };
  var obj = {
    a: 3,
    b: fn,
  };
  t.ok(
    compare(omit(obj, 'a'), {
      b: fn,
    })
  );
  t.end();
});

test('shadowed hasOwnProperty is an ordinary own key', function(t) {
  var shadows = [true, 1, 'value', {}, false, null, undefined];
  t.plan(shadows.length * 3);
  for (var i = 0; i < shadows.length; i++) {
    var obj = Object.create({inherited: 'ignore'});
    obj.hasOwnProperty = shadows[i];
    obj.keep = {value: 1};
    obj.drop = 'remove';
    var expected = {hasOwnProperty: shadows[i], keep: obj.keep};
    t.deepEqual(omit(obj, ['drop']), expected);
    t.deepEqual(omit(obj, 'drop'), expected);
    t.deepEqual(omit(obj, ['drop', 'hasOwnProperty']), {keep: obj.keep});
  }
  t.end();
});

test('do not call a shadowed hasOwnProperty function', function(t) {
  t.plan(3);
  var calls = 0;
  var shadow = function() {
    calls++;
    return false;
  };
  var obj = {hasOwnProperty: shadow, keep: 1, drop: 2};
  t.deepEqual(omit(obj, ['drop']), {hasOwnProperty: shadow, keep: 1});
  t.equal(calls, 0);
  t.deepEqual(obj, {hasOwnProperty: shadow, keep: 1, drop: 2});
  t.end();
});

test('null-prototype input keeps only its own remaining keys', function(t) {
  t.plan(3);
  var obj = Object.create(null);
  obj.keep = 1;
  obj.drop = 2;
  t.deepEqual(omit(obj, ['drop']), {keep: 1});
  t.equal(Object.getPrototypeOf(omit(obj, [])), Object.prototype);
  t.deepEqual(Object.keys(obj), ['keep', 'drop']);
  t.end();
});
