import replaceAll from "./index";

// OK
replaceAll("hello", "l", "w");

// Not OK
// @ts-expect-error
replaceAll();
// @ts-expect-error
replaceAll(0);
// @ts-expect-error
replaceAll([]);
// @ts-expect-error
replaceAll({});
// @ts-expect-error
replaceAll(/nope/);
// @ts-expect-error
replaceAll(false);
// @ts-expect-error
replaceAll("hi");
// @ts-expect-error
replaceAll("hi", "h");
