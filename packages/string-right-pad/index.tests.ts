import rightPad from "./index";

// OK

rightPad("hello", 9);
rightPad("hello", 3);
rightPad("hello", 9, ".");
rightPad("hello", 9, "..");
rightPad("hello", 10, "ab");
rightPad("hello", 9, "\uD83D\uDC04");
rightPad("hello", 10, "\uD83D\uDC11\uD83D\uDC04");
rightPad("hello", 7, "🐄");
// NOT OK

// @ts-expect-error
rightPad(null, 7);
// @ts-expect-error
rightPad([], 4, "*");
// @ts-expect-error
rightPad("hello", 4, true);
// @ts-expect-error
rightPad("hello", -4, true);
// @ts-expect-error
rightPad("hello", 2.3, true);
