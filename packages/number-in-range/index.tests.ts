import inRange from "./index";

type returnType = boolean;
let returnValue: returnType;

// OK
returnValue = inRange(4, 5);
returnValue = inRange(17, 20, 30);

// Not OK
// @ts-expect-error
inRange(undefined, 10);
// @ts-expect-error
inRange(null, 10);
// @ts-expect-error
inRange("js", 10);
// @ts-expect-error
inRange([], 20);
// @ts-expect-error
inRange({}, 10);
// @ts-expect-error
inRange(function() {});
// @ts-expect-error
inRange(10);
// @ts-expect-error
inRange(10, "js");
// @ts-expect-error
inRange(200, []);
// @ts-expect-error
inRange(10, {});
// @ts-expect-error
inRange(10, function() {});
// @ts-expect-error
inRange(10, 10, "js");
// @ts-expect-error
inRange(200, 20, []);
// @ts-expect-error
inRange(10, 10, {});
// @ts-expect-error
inRange(10, 20, function() {});
// @ts-expect-error
inRange();
