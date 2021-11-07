import prune from "./index";

// OK
const test1: "test" = prune("test");
const string: string = "test";
const test2: string = prune(string);
const test3: string = prune("test", 3);
const test4: string = prune("test", 3, "...");

// Not OK
// @ts-expect-error
prune(["test", 3, "..."]);
// @ts-expect-error
prune("test", "...");
// @ts-expect-error
prune("test", "3", "...");
// @ts-expect-error
prune("test", true);
// @ts-expect-error
prune();
