import reduce from './index';

const obj = { a: 3, b: 4, c: 9 };

// OK
const sum: number = reduce(obj, (acc: number, key, value) => {
  acc += value;
  return acc;
});
const isAllOdd = reduce(obj, (acc, key, value) => {
  acc &&= value % 2 === 1;
  return acc;
}, true);
const groupedByReminder = reduce(obj, (acc: { [key in number]: Partial<typeof obj> }, key, value) => {
  acc[value % 3][key] = value
  return acc;
}, {
  0: {},
  1: {},
  2: {},
});
const tail: Omit<object, 'a'> = reduce(obj, (acc: Partial<typeof obj>, key, value, index) => {
  if (index !== 0) {
    acc[key] = value
  }

  return acc;
});

// Not OK
// @ts-expect-error
reduce(null, () => { })
// @ts-expect-error
reduce(1, () => { })
// @ts-expect-error
reduce(true, () => { })
// @ts-expect-error
reduce("str", () => { })
// @ts-expect-error
reduce(obj, (acc: number, key, value, index, keys) => { return true })
// @ts-expect-error
reduce(obj, (acc, key, value, index, keys) => key * 2)
// @ts-expect-error
reduce(obj, (acc, key, value, index, keys) => value.trim())
// @ts-expect-error
reduce(obj, (acc, key, value, index, keys) => index.trim()) // index should be a number.
// @ts-expect-error
reduce(obj, (acc, key, value, index, keys: ['d']) => { })
// @ts-expect-error
reduce(obj, (acc, key, value, index, keys) => { return true }, 1)
// @ts-expect-error
reduce(obj, (acc: number, key, value, index, keys) => { return 1 }, true)
