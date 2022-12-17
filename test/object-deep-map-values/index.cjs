const test = require('../util/test')(__filename);
const deepMapValues = require('../../packages/object-deep-map-values');

const squareFn = (value) => value * value;
const concatFn = (value, key) => key + value;

test('correctly maps using value argument', (t) => {
  t.plan(2);
  const object1 = {a: 1, b: 2, c: 3};
  const return1 = deepMapValues(object1, squareFn);
  t.deepEqual(return1, {a: 1, b: 4, c: 9});
  const object2 = {a: 1, b: {c: 2, d: {e: 3}}};
  const return2 = deepMapValues(object2, squareFn);
  t.deepEqual(return2, {a: 1, b: {c: 4, d: {e: 9}}});
  t.end();
});

test('correctly maps using value and key arguments', (t) => {
  t.plan(2);
  const object1 = {a: 'pple', b: 'anana', c: 'herry'};
  const return1 = deepMapValues(object1, concatFn);
  t.deepEqual(return1, {a: 'apple', b: 'banana', c: 'cherry'});
  const object2 = {a: 'pple', b: {c: 'herry', d: {e: 'lderberry'}}};
  const return2 = deepMapValues(object2, concatFn);
  t.deepEqual(return2, {
    a: 'apple',
    b: {c: 'cherry', d: {e: 'elderberry'}},
  });
  t.end();
});

test('throws error when provided with invalid arguments', (t) => {
  t.plan(4);
  t.throws(
    () => deepMapValues(),
    new RegExp('First argument must be an object')
  );
  t.throws(
    () => deepMapValues({}),
    new RegExp('Second argument must be a function')
  );
  t.throws(
    () => deepMapValues([1, 2, 3], squareFn),
    new RegExp('First argument must be an object')
  );
  t.throws(
    () => deepMapValues({a: 1, b: 2, c: 3}, {}),
    new RegExp('Second argument must be a function')
  );
  t.end();
});
