const test = require('../util/test')(__filename);
const deepMapValues = require('../../packages/object-deep-map-values');

const squareFn = (value) => value * value;
const concatFn = (value, key) => key + value;

test('correctly maps using value argument', (t) => {
  t.plan(2);
  const input1 = {a: 1, b: 2, c: 3};
  const return1 = deepMapValues(input1, squareFn);
  t.deepEqual(return1, {a: 1, b: 4, c: 9});
  const input2 = {a: 1, b: {c: 2, d: {e: 3}}};
  const return2 = deepMapValues(input2, squareFn);
  t.deepEqual(return2, {a: 1, b: {c: 4, d: {e: 9}}});
  t.end();
});

test('correctly maps using value and key arguments', (t) => {
  t.plan(2);
  const input1 = {a: 'pple', b: 'anana', c: 'herry'};
  const return1 = deepMapValues(input1, concatFn);
  t.deepEqual(return1, {a: 'apple', b: 'banana', c: 'cherry'});
  const input2 = {a: 'pple', b: {c: 'herry', d: {e: 'lderberry'}}};
  const return2 = deepMapValues(input2, concatFn);
  t.deepEqual(return2, {a: 'apple', b: {c: 'cherry', d: {e: 'elderberry'}}});
  t.end();
});
