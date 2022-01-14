import zip from './index';

// OK
var a: any[][] = zip()

var b: [number][] = zip(
  [1, 2, 3]
)

var v: [number, string][] = zip(
  [1, 2, 3],
  ['a', 'b', 'c']
)

// OK but throws
zip()

// Not OK
// @ts-expect-error
zip(undefined)
// @ts-expect-error
zip(null)
// @ts-expect-error
zip({ a: true, b: false })
