import tail from './index';

// OK
const test1: number[] = tail([1, 2, 3, 4, 5]);
const test2: string[] = tail([1, 'a', 'b']);
const test3: (number | string)[] = tail([1, 2, 'a', 'b']);
const test4: boolean[] = tail([true]); // []
const test5: number[] = tail([] as number[]); // []
const test6: [2, 3] = tail([1, 2, 3] as const);

// Not OK
// @ts-expect-error
tail(); // throws
// @ts-expect-error
tail({}); // throws
// @ts-expect-error
tail('array'); // throws
// @ts-expect-error
const test7: [1, 2] = tail([1, 2, 3] as const);