import map from "./index";

// OK
map({ a: "cow", b: "sheep" }, (key, value) => key);
map({ a: "cow", b: "sheep" }, (key, value) => value);
map({ a: "cow", b: null }, (key, value) => value);
map({ a: "cow", b: "sheep" }, (key, value) => key + value);
map({ a: "cow", b: null }, (key, value) => key + value);
map([1, 2, 3], (key, value) => key);
map([1, 2, 3], (key, value) => value);
map([1, 2, 3], (key, value) => key + value);

// Not OK
//@ts-expect-error
map();
//@ts-expect-error
map("hello");
//@ts-expect-error
map(1);
//@ts-expect-error
map(true);
//@ts-expect-error
map("hello", () => null);
//@ts-expect-error
map(true, () => null);
//@ts-expect-error
map(1, () => null);
//@ts-expect-error
map({ a: true, b: false }, (key, value) => 2 * value);
//@ts-expect-error
map({ a: new Date() }, (key, value) => value + 10);
//@ts-expect-error
map([true, false], (key, value) => value * 2);
//@ts-expect-error
map([new Date()], (key, value) => value + 10);
