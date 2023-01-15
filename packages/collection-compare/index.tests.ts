import compare from "./index";

type Type1 = {
  a: number;
  b: number;
};
type Type2 = {
  c: number;
  d: number;
  e: number;
};
type Type3 = {
  a: number;
  b: number;
  c: number;
};

const basicArr1 = [1, [2, 3]];
const basicArr2 = [1, [2, 3], 4];

const obj1: Type1 = { a: 2, b: 3 };
const obj2: Type2 = { c: 2, d: 3, e: 4 };
const obj3: Type3 = { a: 2, b: 3, c: 4 };

const funcA = () => true;
const funcB = () => (funcA() ? "yes" : undefined);
const funcC = () => (funcA() ? undefined : "yes");

const num1 = 1;
const num2 = new Number(1);

// OK
compare(1, 2);
compare("1", "2");
compare(false, true);
compare(BigInt(123), BigInt(456));
compare(basicArr1, basicArr1);
compare(basicArr1, basicArr2);
compare(obj1, obj1);
compare(obj1, obj3);
compare(obj3, obj1);
compare(funcB, funcC);
compare(obj1, { b: 3, a: 2 });

compare([1, [2, { a: 4 }], 4], [1, [2, { a: 4 }]]);
compare([1, [2, { a: 4 }], 4], [1, [2, { a: 4 }], 4]);
compare(NaN, NaN);
const compareIt = <T extends object>(a: T, b: T) => compare(a, b);

// Not okay
// @ts-expect-error
compare();
