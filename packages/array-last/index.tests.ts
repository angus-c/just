import last from './index'

// OK
const test1: number = last([1, 2, 3, 4, 5]);
const test2: number[] = last([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const test3: { d: number } = last([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]);
const test4: RegExp = last(["a", 1, true, /r/g]);
const test5: number = last([1]);
const test6: undefined = last([]);

// make sure it works with readonly arrays
const test7: 5 = last([1, 2, 3, 4, 5] as const);

// make sure it works with dynamic arrays and not just static ones
const dynArr = [1, 2, 3];
dynArr.push(4);
const test8: number = last(dynArr);
const dynArr2: (number | string)[] = [1, 2];
dynArr2.push("hi");
const test9: number | string = last(dynArr2);

// Not OK
// @ts-expect-error
last({});
// @ts-expect-error
last(undefined);
// @ts-expect-error
last(null);
// @ts-expect-error
last();
