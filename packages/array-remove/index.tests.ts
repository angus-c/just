import remove from "./index";

// OK
const test1: string[] = remove(['a', 'b'], ['a'])
const test2: string[] = remove(['a', 'b'], ['a', 'b'])
const test3: string[] = remove(['a'], ['a', 'b'])
const test4: number[] = remove([1, 2, 'a'], ['a'])
const test5: (number | true)[] = remove([1, 'a', true, false], [2, 'a', false])
remove([], [])
remove([], [1, 2, 3])

// Not OK
// @ts-expect-error
remove()
// @ts-expect-error
remove(null)
// @ts-expect-error
remove([])
// @ts-expect-error
remove([], [], [])
// @ts-expect-error
remove([2], 2)
// @ts-expect-error
remove({})
// @ts-expect-error
remove("abc", "a")
// @ts-expect-error
const test6: string[] = remove([1, 2, 'a'], ['a'])