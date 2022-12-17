var test = require('../util/test')(__filename);
var flush = require('../../packages/collection-flush');

/*
  flush([1, undefined, 2, null, 3, NaN, 0]); // [1, 2, 3, NaN, 0]
  flush([true, null, false, true, [null], undefined]); // [true, false, true, [null]]
  flush({a: 2, b: null, c: 4, d: undefined}); // {a: 2, c: 4}
  flush('something'); // undefined
  flush(); // undefined
*/

test('removes null/undefined from array', function(t) {
  t.plan(2);
  t.deepEqual(flush([1, undefined, 2, null, 3, 0]), [1, 2, 3, 0]);
  t.deepEqual(flush([true, null, false, true, [null], undefined]), [
    true,
    false,
    true,
    [null],
  ]);
  t.end();
});

test('removes null/undefined from object', function(t) {
  t.plan(1);
  t.deepEqual(flush({a: 2, b: null, c: 4, d: undefined}), {a: 2, c: 4});
  t.end();
});

test('returns empty array as-is', function(t) {
  t.plan(1);
  t.deepEqual(flush([]), []);
  t.end();
});

test('returns empty object as-is', function(t) {
  t.plan(1);
  t.deepEqual(flush({}), {});
  t.end();
});

test('returns undefined if argument is not an array or object', function(t) {
  t.plan(4);
  t.equal(flush('hello'), undefined);
  t.equal(flush(null), undefined);
  t.equal(flush(undefined), undefined);
  t.equal(flush(), undefined);
  t.end();
});
