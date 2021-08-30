import median from './index';

// OK
median([1])
median([1, 2])
median([1, 2, 3])
median(1)
median(1, 2)
median(1, 2, 3)

// Not OK
// @ts-expect-error
median()
// @ts-expect-error
median(null)
// @ts-expect-error
median([])
// @ts-expect-error
median([true])
// @ts-expect-error
median(['a'])
// @ts-expect-error
median([1, 2, false])
// @ts-expect-error
median({})