import truncate from "./index";

// OK
const test1: "test" = truncate("test");
const string: string = "test";
const test2: string = truncate(string);
const test3: string = truncate("test", 3);
const test4: string = truncate("test", 3, "...");

// Not OK
// @ts-expect-error
truncate(["test", 3, "..."]);
// @ts-expect-error
truncate("test", "...");
// @ts-expect-error
truncate("test", "3", "...");
// @ts-expect-error
truncate("test", true);
// @ts-expect-error
truncate();
