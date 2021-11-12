import map from "./index";

// OK
const test1: Record<string, string[]> = map({ a: "string" }, (value) =>
  value.split("")
);
const test2: Record<string, string> = map(
  { a: "string" },
  (value, key) => key + value
);
const test3: Record<string, boolean> = map(
  { a: "string", string: "a", b: "string" },
  (value, key, obj) => obj[value] === key
);

// Not OK
// @ts-expect-error
const test4: Record<string, string> = map({ foo: 1 }, (value) => value + 1);
// @ts-expect-error
map();
// @ts-expect-error
map({ foo: 1 });
// @ts-expect-error
map((value: string) => {});
// @ts-expect-error
map({ foo: 1 }, "");
// @ts-expect-error
map({ foo: 1 }, {});
// @ts-expect-error
map({ a: 1 }, (value: string) => {});
