import compact from './index';

// OK
const test1: unknown[] = compact([]) // []
const test2: number[] = compact([1, 2, 3]) // [1, 2, 3]
const test3: number[] = compact([0, 1, false, 2, undefined]) // [1, 2]
const test4: bigint[] = compact([-0, null, '', BigInt(0), BigInt(1)]) // [BigInt(0), BigInt(1)]

// Inferred as (string | number)[] because of NaN
const test5: (string | number)[] = compact(['a', 'b', 'c', NaN]) // ['a', 'b', 'c']

// Not OK
// @ts-expect-error
compact()
// @ts-expect-error
compact(undefined)
// @ts-expect-error
compact(null)
// @ts-expect-error
compact('array')
// @ts-expect-error
compact({ a: true, b: false })
