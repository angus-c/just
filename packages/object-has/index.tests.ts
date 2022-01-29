import has from './index';

// OK

has({a: 1}, 'a');
has({a: {b: 1}}, 'a.b');
has(undefined, 'a');
const sym = Symbol('foo');
has({[sym]: 1}, sym);
has({a: {b: 1}}, ['a', 'b']);

// NOT OK

// @ts-expect-error
has()
// @ts-expect-error
has({}, () => {});
// @ts-expect-error
has({a: 1});
