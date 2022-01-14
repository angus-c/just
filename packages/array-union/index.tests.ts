import union from './index';

// OK
const test1: string[] = union([] as string[], [] as string[]) // []
const test2: number[] = union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
const test3: (number | string)[] = union([1, 2, 3], ['a', 'b', 'c'])

// Not OK
// @ts-expect-error
union()
// @ts-expect-error
union(undefined)
// @ts-expect-error
union(null)
// @ts-expect-error
union([])
// @ts-expect-error
union([], null)
// @ts-expect-error
union([], undefined)
// @ts-expect-error
union([], {})
// @ts-expect-error
union([], [], [])
