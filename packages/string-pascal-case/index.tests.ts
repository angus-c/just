import pascalCase from './index'

// OK
pascalCase('myString');

// Not OK
// @ts-expect-error
pascalCase();
// @ts-expect-error
pascalCase(0);
// @ts-expect-error
pascalCase([]);
// @ts-expect-error
pascalCase({});
// @ts-expect-error
pascalCase(/nope/);
// @ts-expect-error
pascalCase(false);
