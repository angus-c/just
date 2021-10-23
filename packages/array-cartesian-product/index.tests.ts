import cartesian from './index';

// OK
cartesian([])

cartesian([
  [1, 2, 3]
])

cartesian([
  [1, 2, 3],
  ['a', 'b', 'c']
])

// Not OK
// @ts-expect-error
cartesian()
// @ts-expect-error
cartesian(undefined)
// @ts-expect-error
cartesian(null)
// @ts-expect-error
cartesian(['array'])
// @ts-expect-error
cartesian([1, 2, 3])
// @ts-expect-error
cartesian({ a: true, b: false })
