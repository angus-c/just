import random from "./index";

// OK
const test1: undefined = random([]);
const test2: 1 = random([1]);
const test3: number = random([1, 2, 3]);
const test4: number | string = random([1, 2, "a"]);
const numbers: number[] = [];
const test5: number | undefined = random(numbers);

// Not OK
// @ts-expect-error
random();
// @ts-expect-error
random(null);
// @ts-expect-error
random({});
// @ts-expect-error
random(1);
// @ts-expect-error
random([], []);
// @ts-expect-error
random("arr");

const array = [1];
// @ts-expect-error
const result: undefined = random(array);
