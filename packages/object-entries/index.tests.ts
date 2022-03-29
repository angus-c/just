import entries from './index';

const obj = { a: 1, b: 2 };

// OK
const test1: ["a" | "b", number][] = entries(obj);
const test2: [
  "a" | "b",
  {
    bb: number;
  } | {
    aa: number;
  }
][] = entries({ b: { bb: 4 }, a: { aa: 2 } });
const test3: [never, never][] = entries({});

const arrayTest1: [number, number][] = entries([1, 2, 3]); // [[0, 1],[1, 2],[2, 3]]
const arrayTest2: [number, string | number | boolean][] = entries([1, true, "a"]);
const arrayTest3: [number, never][] = entries([]); // []

// Not OK
// @ts-expect-error
entries();
// @ts-expect-error
entries(null);
// @ts-expect-error
entries(undefined);
// @ts-expect-error
entries(1);
// @ts-expect-error
entries(true);
// @ts-expect-error
entries("a");
// @ts-expect-error
entries([], true);