import memoizeLast from './index'

// OK
memoizeLast((a: {languages: ['js', 'lua', 'python']}) => a);
memoizeLast((a: number, b: number) => a + b);
memoizeLast((a: string, b: string) => a + b);
memoizeLast((a: [1, 2, 3], b: [1, 2, 3]) => a.concat(b));
memoizeLast(() => true);
memoizeLast((a: boolean, b: boolean, c: boolean, d: boolean) => a && b && c && d);
memoizeLast((a: null, b: {}, c: [], d: null, e: 'javascript') => {
  return [a, b, c, d, e];
});

// not OK
// @ts-expect-error
memoizeLast();

// @ts-expect-error
memoizeLast({});

// @ts-expect-error
memoizeLast([]);

// @ts-expect-error
memoizeLast(() => 123, 'javascript');

// @ts-expect-error
memoizeLast(() => 123, 123);
