import isEmpty from "./index";

// OK

// Known
const test1: true = isEmpty(null);
const test2: true = isEmpty(undefined);
const test3: true = isEmpty([]);
const test4: true = isEmpty("");
const test5: true = isEmpty(0);
const test6: true = isEmpty(1);
const test7: true = isEmpty(true);
const test8: true = isEmpty(false);
const test9: true = isEmpty(Symbol("abc"));
const test10: true = isEmpty(Symbol(""));

// Unknown
const test11: boolean = isEmpty([1, 2]);
const test12: boolean = isEmpty("abc");
const test13: boolean = isEmpty({ a: 3, b: 5 });
const test14: boolean = isEmpty(new Set([1, 2, 2]));
const test15: boolean = isEmpty(new Map().set("a", 2));
const test16: boolean = isEmpty({});
const test17: boolean = isEmpty(new Set());
const test18: boolean = isEmpty(new Map());
const test19: boolean = isEmpty(new String("abc"));
const test20: boolean = isEmpty(new String(""));
const test21: boolean = isEmpty(new Boolean(true));
