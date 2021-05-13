import unique from './index';

// OK
const test1: number[] = unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]

var a = { a: 3 };
var b = { b: 4 };
var c = { c: 5 };
const test2: (typeof a | typeof b | typeof c)[] = unique([a, a, b, c, b]); // [a, b, c]
const test3: (number | string)[] = unique([1, '1', 2, '2', 3, 2]); // [1, '1', 2, '2', 3]
const test4: boolean[] = unique([true, true, false, false, true])
const test5: number[] = unique([NaN, NaN, NaN])


// declaring sorted array for performance
const test6: (number | string)[] = unique([1, 1, '1', 2, 2, 5, '5', '5'], true); // [1, '1', 2, 5, '6']

// declaring strings array for performance
const test7: string[] = unique(['a', 'c', 'b', 'c', 'a'], false, true); // ['a', 'b', 'c']

const test8: unknown[] = unique([])

// Not OK
// @ts-expect-error
unique()
// @ts-expect-error
unique(undefined)
// @ts-expect-error
unique(null)
// @ts-expect-error
unique('array')
// @ts-expect-error
unique(100)
// @ts-expect-error
unique([1, 2], false, true) // arr type must be string[] when strings is true.
// @ts-expect-error
unique(['a', 'b'], 'true')
// @ts-expect-error
unique(['a', 'b'], 0, true)
// @ts-expect-error
unique(['a', 'b'], null, [])