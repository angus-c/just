import insert from './index'

// OK
const arr1: number[] = [1, 2, 3, 4, 5, 6];
const arr2: string[] = ['a', 'b', 'c'];
let test1: (number | string)[]
test1 = insert(arr1, arr2);
test1 = insert(arr1, 'x');
test1 = insert(arr1, arr2, 0);
test1 = insert(arr1, arr2, arr1.length + 1);
test1 = insert(arr1, 'x', 1);
test1 = insert(arr1, arr2, undefined); // throw

const test2: (number | null)[] = insert(arr1, null, 1);
const test3: unknown[] = insert([], []);

// Not OK
// @ts-expect-error
insert(undefined, arr2, 4);
// @ts-expect-error
insert(null, arr2, 3);
// @ts-expect-error
insert({}, arr2, 3);
// @ts-expect-error
insert(arr1, arr2, 'x');
// @ts-expect-error
insert(arr1, arr2, '4');
// @ts-expect-error
insert(arr1, arr2, {});
// @ts-expect-error
insert(arr1, arr2, null);
