var test = require('../util/test')(__filename);
var findIndexOf = require('../../packages/array-find-index-of');

test('should return -1 if no object has matching key/value pair', function(t) {
  var obj = [{a: 5, b: 3}, {a: 7, b: 4}, {a: 7, b: 8}, {a: 5, b: 10}];
  var arr = [[4, 5, 6, 7], [3, 4, 5, 6], [0, 2, 3, 7]];
  t.plan(5);
  t.equal(findIndexOf(obj, 'a', 9), -1);
  t.equal(findIndexOf(obj, 'b', 15), -1);
  t.equal(findIndexOf(obj, 'c', 0), -1);
  t.equal(findIndexOf(arr, 'b', 15), -1);
  t.equal(findIndexOf(arr, 1, 3), -1);
  t.end();
});

test('return the index of the first object that contains specified key/value pair', function(t) {
  var item = {c: 7};
  var obj = [{a: 'a', b: 'b'}, {a: 'aa', b: 'bb'}, {a: 'aaa', b: 'bbb'}, {a: 'aaaa', b: 'bbbb'}];
  var obj2 = [{a: 'a', b: 'b'}, {a: 'aa', b: 'bb'}, {a: 'aaa', b: item}];
  t.plan(3);
  t.equal(findIndexOf(obj, 'a', 'aaa'), 2);
  t.equal(findIndexOf(obj, 'b', 'bbbb'), 3);
  t.equal(findIndexOf(obj2, 'b', item), 2);
  t.end();
});

test('works with values in arrays of arrays', function(t) {
  t.plan(3);
  t.equal(findIndexOf([[4, 5, 6, 7], [3, 4, 5, 6], [0, 2, 3, 7]], 1, 2), 2);
  t.equal(findIndexOf([['a', 'b', 'c'], ['a', 'b', 'c'], ['d', 'e', 'f']], 1, 'b'), 0);
  t.equal(findIndexOf([['a', 'b', 'c'], ['a', 'b', 'c'], ['d', 'e', 'f']], 0, 'd'), 2);
  t.end();
});

test('throws if first argument is not an array', function(t) {
  t.plan(3);
  t.throws(function() {
    findIndexOf(3, 1, 2);
  });
  t.throws(function() {
    findIndexOf();
  });
  t.throws(function() {
    findIndexOf(undefined, 'key', 5);
  });
  t.end();
});

test('throws if search key and value not provided', function(t) {
  t.plan(2);
  t.throws(function() {
    findIndexOf({});
  });
  t.throws(function() {
    findIndexOf({a: '5', b: '8'}, 'a');
  });
  t.end();
});
