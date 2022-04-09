import flip from './index';

const getOne = (...args: never) => {
  return 1;
}
const addOne = (n: number) => {
  return n + 1
}
const repeat = (str: string, n: number) => {
  return str.repeat(n)
}
const getFormattedPrice = (amount: number, unit: string, includeTax: boolean) => {
  const tax = includeTax ? 1.1 : 1
  return `${unit}${amount * tax}`
}

// OK
flip(getOne)()

flip(addOne)(undefined, -1)

flip(repeat)(3, "hello")

flip(getFormattedPrice)("$", 1000, true)

flip(console.log)();
flip(console.log)(1, "a");
flip(console.log)(1, 2, 3);
flip(console.log)(true, "a", 3, 4, 5);

// Not OK

// @ts-expect-error
flip(getOne)(1)

// @ts-expect-error
flip(addOne)()
// @ts-expect-error
flip(addOne)(1, 2, 3)
// @ts-expect-error

flip(repeat)()
// @ts-expect-error
flip(repeat)(1)
// @ts-expect-error
flip(repeat)(1, "hello", true)
// @ts-expect-error
flip(repeat)(1, 2)
// @ts-expect-error
flip(repeat)("hello", "world")

// @ts-expect-error
flip(getFormattedPrice)()
// @ts-expect-error
flip(getFormattedPrice)("$")
// @ts-expect-error
flip(getFormattedPrice)("$", 1000)
// @ts-expect-error
flip(getFormattedPrice)("$", 1000, true, undefined)
// @ts-expect-error
flip(getFormattedPrice)(undefined, 10000, true)
// @ts-expect-error
flip(getFormattedPrice)("$", undefined, true)
// @ts-expect-error
flip(getFormattedPrice)("$", 10000, undefined)