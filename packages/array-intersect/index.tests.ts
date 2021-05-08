import intersect from './index';

// OK
const test1: unknown[] = intersect([], [])
const test2: number[] = intersect([1, 2, 3], [2, 3, 4])
const test3: (number | string)[] = intersect([1, 2, "a"], [2, 3, "a"])
const test4: number[] = intersect([1, 2, "a"], [1, 2, true])
const test5: unknown[] = intersect([1, 2, 3], ["a", "b", "c"])

// Not OK
// @ts-expect-error
intersect();
// @ts-expect-error
intersect([]);
// @ts-expect-error
intersect([], {});
// @ts-expect-error
intersect("arr", []);
// @ts-expect-error
intersect([1], [2], [3]);