var test = require('../util/test')(__filename);
var index = require('../../packages/array-index');

test('indexes an array of objects', function(t) {
  t.plan(1);
  t.deepEqual(index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id'), {
    first: {id: 'first', val: 1},
    second: {id: 'second', val: 2},
  });
  t.end();
});

test('drops elements without specified key', function(t) {
  t.plan(1);
  t.deepEqual(index([{id: 'first', val: 1}, null], 'id'), {
    first: {id: 'first', val: 1},
  });
  t.end();
});

test('returns empty array as empty object', function(t) {
  t.plan(1);
  t.deepEqual(index([], 'id'), {});
  t.end();
});

test('throws if first argument is not an array', function(t) {
  t.plan(6);
  t.throws(function() {
    index({}, 'name');
  });
  t.throws(function() {
    index('hello', 'name');
  });
  t.throws(function() {
    index(/hullo/, 'name');
  });
  t.throws(function() {
    index(null, 'name');
  });
  t.throws(function() {
    index(undefined, 'name');
  });
  t.throws(function() {
    index();
  });
  t.end();
});

test('throws if second argument is not a string', function(t) {
  t.plan(6);
  t.throws(function() {
    index([], {});
  });
  t.throws(function() {
    index([], function() {});
  });
  t.throws(function() {
    index([], /hullo/);
  });
  t.throws(function() {
    index([], null);
  });
  t.throws(function() {
    index([], undefined);
  });
  t.throws(function() {
    index([]);
  });
  t.end();
});
