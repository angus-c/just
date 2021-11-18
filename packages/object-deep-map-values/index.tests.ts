import deepMapValues from "./index";
type RecursiveObject<T> = { [key: string]: T | RecursiveObject<T> };

const test1: RecursiveObject<string[]> = deepMapValues(
  { a: "string", b: { c: "apple" } },
  (value) => value.split("")
);
const test2: RecursiveObject<boolean> = deepMapValues(
  { a: 1, b: { c: 2 } },
  (value) => value % 2 === 0
);
const test3: RecursiveObject<string> = deepMapValues(
  { a: "pple", b: { c: "herry" } },
  (value, key) => key + value
);

// @ts-expect-error
deepMapValues();
// @ts-expect-error
deepMapValues({});
// @ts-expect-error
deepMapValues({ a: 1 }, (value: string) => {});
