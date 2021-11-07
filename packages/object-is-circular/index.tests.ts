import isCircular from "./index";

// OK
const test1: boolean = isCircular(null);
const test2: boolean = isCircular([]);
const test3: boolean = isCircular("abc");
const test4: boolean = isCircular(1);
const test5: boolean = isCircular(true);
const test6: boolean = isCircular({});
