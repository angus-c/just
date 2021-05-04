import last from './index'

// OK
const test1: number = last([1, 2, 3, 4, 5]);
const test2: number[] = last([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const test3: { d: number } = last([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]);
const test4: RegExp = last(['a', 1, true, /r/g]);
const test5: number = last([1]);
const test6: undefined = last([]);

// Not OK
// @ts-expect-error
last({});
// @ts-expect-error
last(undefined);
// @ts-expect-error
last(null);
// @ts-expect-error
last();