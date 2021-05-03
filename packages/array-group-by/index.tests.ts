import groupBy from './index'

// OK
const test1: { [key: string]: number[] } = groupBy([6.1, 4.2, 6.3], Math.floor);
const test2: { [key: string]: string[] } = groupBy(['a', 'b', 'c', 'aa', 'bb', 'cc'], str => str.charAt(0));
const test3: { [key: string]: number[][] } = groupBy([[1], [2], [1, 2]], arr => arr.length);
const test4: {} = groupBy([], () => "a");
const test5: { [key: string]: (number | string)[] } = groupBy([1, 2, 3, "1", "2"], parseInt);
const test6 = groupBy(['a', 'b', 'c'], str => Symbol(str));

// Not OK
// @ts-expect-error
groupBy();

// First argument must be an array.
// @ts-expect-error
groupBy({}, Math.floor);
// @ts-expect-error
groupBy('hello', Math.floor);
// @ts-expect-error
groupBy(/hullo/, Math.floor);
// @ts-expect-error
groupBy(null, Math.floor);
// @ts-expect-error
groupBy(undefined, Math.floor);

// @ts-expect-error
groupBy(["a", "b", "c"], () => { });
// @ts-expect-error
groupBy(["a", "b", "c"], Math.floor);
// @ts-expect-error
groupBy(["a", "b", "c"], () => null);
// @ts-expect-error
groupBy([], {});
// @ts-expect-error
groupBy([], []);
// @ts-expect-error
groupBy([], /hullo/);
// @ts-expect-error
groupBy([], null);
// @ts-expect-error
groupBy([], undefined);
// @ts-expect-error
groupBy([]);
