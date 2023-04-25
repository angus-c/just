import variance from "./index"

//OK
variance(3, 2, 1);
variance([1, 2, 3, 2, 4, 1]);
variance(1, 2, 3, 4, 5, -6);
variance([1, 2, 3, 4, 9]);

variance([4]);

const readonlyArr: readonly number[] = [1, 2, 3];
variance(readonlyArr);
variance(...readonlyArr);

// NG
// @ts-expect-error
variance(["3", 2]); // throws
// @ts-expect-error
variance(null); // throws
// @ts-expect-error
variance("3", 2); // throws
// @ts-expect-error
variance(undefined); // throws
