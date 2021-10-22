import camelCase from './index'

// OK
camelCase('myString');

// Not OK
// @ts-expect-error
camelCase();
// @ts-expect-error
camelCase(0);
// @ts-expect-error
camelCase([]);
// @ts-expect-error
camelCase({});
// @ts-expect-error
camelCase(/nope/);
// @ts-expect-error
camelCase(false);
