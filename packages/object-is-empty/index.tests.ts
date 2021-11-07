import isEmpty from "./index";

// OK

// Known
const test1: true = isEmpty(null);
const test2: true = isEmpty(undefined);
const test3: true = isEmpty([]);
const test4: false = isEmpty([1, 2]);
const test5: false = isEmpty("abc");
const test6: true = isEmpty("");
const test7: true = isEmpty(0);
const test8: true = isEmpty(1);
const test9: true = isEmpty(true);
const test10: true = isEmpty(false);
const test11: true = isEmpty(Symbol("abc"));
const test12: true = isEmpty(Symbol(""));

// Unknown
const test13: boolean = isEmpty({ a: 3, b: 5 });
const test14: boolean = isEmpty(new Set([1, 2, 2]));
const test15: boolean = isEmpty(new Map().set("a", 2));
const test16: boolean = isEmpty({});
const test17: boolean = isEmpty(new Set());
const test18: boolean = isEmpty(new Map());
const test19: boolean = isEmpty(new String("abc"));
const test20: boolean = isEmpty(new String(""));
const test21: boolean = isEmpty(new Boolean(true));
