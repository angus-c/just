import omit from './index';

const obj = {
	a: 1,
	b: 2,
	c: 3
}

{
	const test: { c: number } = omit(obj, ['a', 'b'])
}
{
	const test: { a: number, c: number } = omit(obj, ['b', 'b', 'b'])
}
{
	const test: { b: number } = omit(obj, 'a', 'c')
}

// Not OK
// @ts-expect-error
omit();
// @ts-expect-error
omit(null);
// @ts-expect-error
omit(1);
// @ts-expect-error
omit(true);
// @ts-expect-error
omit('hello');
// @ts-expect-error
omit([]);
// @ts-expect-error
omit({});
// @ts-expect-error
omit({}, 1);
// @ts-expect-error
omit({}, true);
// @ts-expect-error
omit({}, "a", 1);
// @ts-expect-error
omit({}, null);
// @ts-expect-error
omit({}, {}, 'a');
// @ts-expect-error
omit({ a: 1 }, { a: 1 });
// @ts-expect-error
omit({ a: 1}, ['a', 'b'])
