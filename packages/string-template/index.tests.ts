import template from "./index";

// OK
const test1: string = template("string", {});
const test2: string = template("string", { a: "a" });
const test3: string = template("string", { a: { aa: "aa" } });
const test4: string = template("string", { a: { aa: { aaa: "aaa" } } });

// Not OK
// @ts-expect-error
template("string");
// @ts-expect-error
template("string", "string");
// @ts-expect-error
template("string", 1);
// @ts-expect-error
template("string", true);
// @ts-expect-error
template("string", null);
// @ts-expect-error
template("string", undefined);
// @ts-expect-error
template("string", ["string"]);
// @ts-expect-error
template("string", { a: 1 });
// @ts-expect-error
template("string", { a: true });
// @ts-expect-error
template("string", { a: null });
// @ts-expect-error
template("string", { a: undefined });
// @ts-expect-error
template("string", { a: ["string"] });
