import snakeCase from './index'

// OK
snakeCase('myString');

// Not OK
// @ts-expect-error
snakeCase();
// @ts-expect-error
snakeCase(0);
// @ts-expect-error
snakeCase([]);
// @ts-expect-error
snakeCase({});
// @ts-expect-error
snakeCase(/nope/);
// @ts-expect-error
snakeCase(false);
