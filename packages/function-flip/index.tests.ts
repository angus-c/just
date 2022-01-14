import flip = require('./index');

const fn = (...args: never) => {
  return 21;
}

// OK

flip(console.log)(1, 2, 3);
flip(console.log)();
flip<(...args: any[]) => void>(console.log)(1, 2, 3);
flip<typeof console.log>(console.log)(1, 2, 3);
flip(Array)(1, 2);
flip<typeof Array>(Array)(1, 2);
flip<(...args: string[]) => string[]>(Array)("Hello", "World");
flip<any>(fn)(34);

// Not OK

// @ts-expect-error
flip(null)(1, 2, 3);
// @ts-expect-error
flip(1)(1, 2, 3);
// @ts-expect-error
flip('Hello World')(1, 2, 3);
// @ts-expect-error
flip()(1, 2, 3);
// @ts-expect-error
flip<(...args: never[]) => void>(console.log)(1, 2, 3);
// @ts-expect-error
flip<(...args: number[]) => string>(Array)(1, 2);
// @ts-expect-error
flip(fn)(34)
// @ts-expect-error
flip<(...args: number[]) => number>(fn)(34)
