import last from './index'

// OK
const test1: number = last([1, 2, 3, 4, 5]);
const test2: number[] = last([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const test5: number = last([1]);
const test6: undefined = last([]);
//you have to be a bit more generic when array has mixed types
const test3: object = last([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]);
const test4: any = last(['a', 1, true, /r/g]);

// Not OK
// @ts-expect-error
last({});
// @ts-expect-error
last(undefined);
// @ts-expect-error
last(null);
// @ts-expect-error
last();
