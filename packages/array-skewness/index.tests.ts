import skewness from "./index"

//OK
skewness(3, 2, 1);
skewness([1, 2, 3, 2, 4, 1]);
skewness(1, 2, 3, 4, 5, -6);
skewness([1, 2, 3, 4, 9]);


skewness([4]);


// @ts-expect-error
skewness(["3", 2]); // throws
// @ts-expect-error
skewness(null); // throws
// @ts-expect-error
skewness("3", 2); // throws
// @ts-expect-error
skewness(undefined); // throws
