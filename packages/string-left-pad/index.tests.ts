import leftPad from "./index";

// OK

leftPad("hello", 9);
leftPad("hello", 3);
leftPad("hello", 9, ".");
leftPad("hello", 9, "..");
leftPad("hello", 10, "ab");
leftPad("hello", 9, "\uD83D\uDC04");
leftPad("hello", 10, "\uD83D\uDC11\uD83D\uDC04");
leftPad("hello", 7, "🐄");
// NOT OK

// @ts-expect-error
leftPad(null, 7);
// @ts-expect-error
leftPad([], 4, "*");
// @ts-expect-error
leftPad("hello", 4, true);
// @ts-expect-error
leftPad("hello", -4, true);
// @ts-expect-error
leftPad("hello", 2.3, true);
