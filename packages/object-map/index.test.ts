import map from "./index";

// OK
const test1: Record<string, boolean> = map(
  { primary: null, secondary: null },
  (key) => key === "primary"
);
const test2: Record<string, number> = map(
  { primary: null, secondary: null },
  (key) => key.length
);
const test3: Record<string, string> = map(
  { a: "pple" },
  (key, value) => key + value
);
type MyObject = {
  k1: number,
  k2: number,
}
const myObject: MyObject = { k1: 1, k2: 2 };
const test4: MyObject = map(myObject, (key: keyof MyObject, value) => value + 1);

// Not OK
// @ts-expect-error
const test5: Record<string, string> = map({ foo: 1 }, (_, value) => value + 1);
// @ts-expect-error
map();
// @ts-expect-error
map({ foo: 1 });
// @ts-expect-error
map((value) => {});
// @ts-expect-error
map({ foo: 1 }, "");
// @ts-expect-error
map({ foo: 1 }, {});
