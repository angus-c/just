import shuffle from './index';

// OK
shuffle([])
shuffle([1, 2, 3])
shuffle([true, false, 1])
shuffle([1, 2, 3], { shuffleAll: true })
shuffle([1, 2, 3], { shuffleAll: false })

// Not OK
// @ts-expect-error
shuffle()
// @ts-expect-error
shuffle(null)
// @ts-expect-error
shuffle(undefined)
// @ts-expect-error
shuffle({})
// @ts-expect-error
shuffle([], null)
// @ts-expect-error
shuffle([], 1)
// @ts-expect-error
shuffle([], {})
// @ts-expect-error
shuffle([], { option: true })
// @ts-expect-error
shuffle([1, 2, 3], { shuffleAll: undefined })
// @ts-expect-error
shuffle([], { shuffleAll: 1 })