var test = require('../util/test')(__filename);
var index = require('../../packages/array-index');

test('indexes an array of objects', function(t) {
  t.plan(1);
  t.deepEqual(
    index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id'),
    {
      first: {id: 'first', val: 1},
      second: {id: 'second', val: 2},
    }
  );
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

test('returns undefined if first argument is not an array', function(t) {
  t.plan(6);
  t.equal(index({}), undefined);
  t.equal(index('hello'), undefined);
  t.equal(index(/hello/), undefined);
  t.equal(index(null), undefined);
  t.equal(index(undefined), undefined);
  t.equal(index(), undefined);
  t.end();
});

test('returns undefined if second argument is not a string', function(t) {
  t.plan(6);
  t.equal(index([], {}), undefined);
  t.equal(index([], []), undefined);
  t.equal(index([], /hello/), undefined);
  t.equal(index([], null), undefined);
  t.equal(index([], undefined), undefined);
  t.equal(index([]), undefined);
  t.end();
});
