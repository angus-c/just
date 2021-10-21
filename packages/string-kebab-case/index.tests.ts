import kebabCase from './index'

// OK
kebabCase('myString');

// Not OK
// @ts-expect-error
kebabCase();
// @ts-expect-error
kebabCase(0);
// @ts-expect-error
kebabCase([]);
// @ts-expect-error
kebabCase({});
// @ts-expect-error
kebabCase(/nope/);
// @ts-expect-error
kebabCase(false);
