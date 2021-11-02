import values from './index';

const obj = { a: 3, b: 5, c: 9 };
interface FnWithProps {
  (a: string, b: string): string
  prop1?: string
  prop2?: number
}

const fn: FnWithProps = function (a, b) { return a + b }
fn.prop1 = "foo"
fn.prop2 = 0

// OK
const test1: number[] = values(obj);
const test2: (number | string | boolean)[] = values({
	...obj,
	d: "a",
	e: true
});
const test3: never[] = values({});
const test4: number[] = values([1, 2, 3]);
const test5: Array<string|number|undefined> = values(fn);
const test6: string[] = values(new String('hello')); // ['h', 'e', 'l', 'l', 'o']
const test7: never[] = values(new Number(123)); // []
const test8: never[] = values(new Boolean(true)); // []

// Not OK
// @ts-expect-error
values();
// @ts-expect-error
values(null); // throw exception
