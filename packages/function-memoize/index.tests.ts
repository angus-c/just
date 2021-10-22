import memoize from './index';

const testfn = (a: string, b: number) => { return a + b}
//only memoize on a
const testkey = (a: string) => a

// OK
memoize(testfn, testkey)
memoize(testfn, (a, b) => a)
memoize(() => {})

// not OK
// @ts-expect-error
memoize();
// @ts-expect-error
memoize({});
// @ts-expect-error
memoize([]);
// @ts-expect-error not function
memoize(() => 123, 'javascript');
// @ts-expect-error not function
memoize(() => 123, 123);
// @ts-expect-error not returning string key
memoize(() => 123, () => 123);
// @ts-expect-error args dont match original function
memoize(testfn, (a: number) => '' + number);
