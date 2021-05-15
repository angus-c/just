import splitAt from './index';

// OK
const test1: [number[], number[]] = splitAt([1, 2, 3], 2); // [[1, 2], [3]]
const test2: [number[], number[]] = splitAt([1, 2, 3, 4, 5], -1); // [[1, 2, 3, 4], [5]]
const test3: [unknown[], unknown[]] = splitAt([], 3); // [[], []]
const test4: [boolean[], boolean[]] = splitAt([true, false]); // [[], [true, false]]

// Not OK
// @ts-expect-error
splitAt()
// @ts-expect-error
splitAt(null, 1)
// @ts-expect-error
splitAt(undefined, 1)
// @ts-expect-error
splitAt([], true)
// @ts-expect-error
splitAt([], [])
// @ts-expect-error
splitAt([], 2, 3)