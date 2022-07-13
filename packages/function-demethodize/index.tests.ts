import demethodize from "./index";

//OK

const test1: (p: string) => string = demethodize("".trim);
const test2 = demethodize<string, "big">("".big);
const test3 = demethodize<number, "toFixed">((1).toFixed);
const test4 = demethodize<Object, "toString">({}.toString);
const test5 = demethodize<any[], "map">([].map);
const test6 = demethodize<string, [string], string[]>("".split);

// Not OK
// @ts-expect-error
demethodize<string, "trim">();
// @ts-expect-error
demethodize<number, "valueOf">((1).toExponential);
// @ts-expect-error
demethodize<boolean, "valueOf">([].toString);
// @ts-expect-error
demethodize<number[], "length">([].length);
// @ts-expect-error
demethodize<string>("".trim);
