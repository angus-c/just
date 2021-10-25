import mode from './index';

// OK
mode([1])
mode([1, 2])
mode([1, 2, 3])
mode(1)
mode(1, 2)
mode(1, 2, 3)

// Kinda OK
//Note: these will cause runtime errors, accepting the tradeoff to keep typings readable
mode([])
mode()

// Not OK
// @ts-expect-error
mode(null)
// @ts-expect-error
mode([true])
// @ts-expect-error
mode(['a'])
// @ts-expect-error
mode([1, 2, false])
// @ts-expect-error
mode({})
