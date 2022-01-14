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

// Not OK
// @ts-expect-error
const test4: Record<string, string> = map({ foo: 1 }, (_, value) => value + 1);
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
