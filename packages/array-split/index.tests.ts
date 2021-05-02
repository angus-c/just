import split from './index'

split([]); // []
split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
split([1, 2, 3, 4, 5], null); // [[1, 2, 3, 4, 5]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split(['a', 'b', 'c', 'd', 'e'], 2); // [['a', 'b'], ['c', 'd'], ['e']]
split([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// return types should match input type
const numberArray = split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
numberArray[0][0] = 1;
numberArray[0] = [7,8,9];
// @ts-expect-error
numberArray[0][0] = 'a';
// @ts-expect-error
numberArray[0] = ['a','b','c'];

// mixed return types should match the input array type
type MixedArray = Array<string | number | {s: string, n: number}>;
const mixedArray : MixedArray = ['a',1, {s: 'b', n: 2}];
const splitMixedArray = split(mixedArray, 2);
splitMixedArray[0].push(3);
splitMixedArray[0].push('c');
splitMixedArray[0].push({s: 'd', n: 4});
// @ts-expect-error
splitMixedArray[0].push({s: 5});

// not OK
// @ts-expect-error
split(null, 3); // throws
// @ts-expect-error
split([1, 2, 3, 4, 5, 6], '3'); // throws
// @ts-expect-error
split([1, 2, 3, 4, 5, 6], {}); // throws
