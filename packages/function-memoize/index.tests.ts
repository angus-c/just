import memoize from './index';

type Fn = (a: string, b: number) => string

const testfn = (a: string, b: number) => { return a + b }
//only memoize on a
const testkey = (a: string) => a

// OK
const a: Fn = memoize(testfn, testkey)
const b: Fn = memoize(testfn, (a, b) => a)
const c: ()=>void = memoize(() => {})

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
