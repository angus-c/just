import capitalize from './index'

// OK
capitalize('myString');

// Not OK
// @ts-expect-error
capitalize();
// @ts-expect-error
capitalize(0);
// @ts-expect-error
capitalize([]);
// @ts-expect-error
capitalize({});
// @ts-expect-error
capitalize(/nope/);
// @ts-expect-error
capitalize(false);
