import { values } from './index';

const obj = { a: 3, b: 5, c: 9 };

// OK
const test1: number[] = values(obj);
const test2: (number | string | boolean)[] = values({
	...obj,
	d: "a",
	e: true
});
const test3: unknown[] = values({});
const test4: number[] = values([1, 2, 3]);
const test5: unknown[] = values(function (a, b) { return a + b; });
const test6: string[] = values(new String('hello')); // ['h', 'e', 'l', 'l', 'o']
const test7: unknown[] = values(new Number(123)); // []
const test8: unknown[] = values(new Boolean(true)); // []

// Not OK
// @ts-expect-error
values();
// @ts-expect-error
values(null); // throw exception
// @ts-expect-error
values(1); // throw exception
// @ts-expect-error
values(true); // throw exception
// @ts-expect-error
values('hello'); // throw exception