import partition from './index';

// OK
const test1: [number[], number[]] = partition([1, 5, 2, 4, 3], n => n > 3);
const test2: [string[], number[]] = partition(['a', 2, 3, '3'], x => typeof x == 'string') as [string[], number[]]; //if you know better than typescript
const test3: [number[], number[]] = partition([1, 2, 3, 4], x => typeof x == 'string');
const test4: [unknown[], unknown[]] = partition([], n => n > 3); // [[], []]

// Not OK
// @ts-expect-error
partition([1, 2, 3], str => str.length);
// @ts-expect-error
partition([1, 2, 3], "func");
// @ts-expect-error
partition({ a: 1, b: 2 }, n => n > 1);
// @ts-expect-error
partition(null, n => n > 1);
// @ts-expect-error
partition(undefined, n => n > 1);
// @ts-expect-error
partition([1, 5, 2, 4, 3], n => n > 3, "a");
