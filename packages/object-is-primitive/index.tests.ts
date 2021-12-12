import isPrimitive from "./index";

const test1: true = isPrimitive("hi");
const test2: true = isPrimitive(3);
const test3: true = isPrimitive(true);
const test4: true = isPrimitive(false);
const test5: true = isPrimitive(null);
const test6: true = isPrimitive(undefined);
const test7: true = isPrimitive(Symbol());

const test8: false = isPrimitive({});
const test9: false = isPrimitive([]);
const test10: false = isPrimitive(function() {});
const test11: false = isPrimitive(new Date());
const test12: false = isPrimitive(/a/);
