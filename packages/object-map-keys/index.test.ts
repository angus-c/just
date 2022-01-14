import map from "./index";

// OK

map([1, 2, 3], (value) => value * 2);
map([1, 2, 3], (value, key) => key + value);
map([1, 2, 3], (value, key, obj) => `${key + value}-${obj.length}`);
map({ a: "cow", b: "sheep", c: "pig" }, (value) => value * 2);
map({ a: "cow", b: "sheep", c: "pig" }, (value, key) => key + value);
map(
  { a: "cow", b: "sheep", c: "pig" },
  (value, key, obj) => `${key + value}-${obj.a}`
);

// Not OK

// @ts-expect-error
map();
// @ts-expect-error
map("hello", (value) => value);
// @ts-expect-error
map(1, (value) => value);
// @ts-expect-error
map(true, (value) => value);
// @ts-expect-error
map([1, 2, 3], () => true);
// @ts-expect-error
map([1, 2, 3], () => []);
// @ts-expect-error
map([1, 2, 3], () => ({}));
// @ts-expect-error
map([1, 2, 3], () => new Set());
// @ts-expect-error
map({ a: "cow", b: "sheep" }, (value, key, obj) => key + obj.length());
