import percentile from "./index"

//Ok
var a: number = percentile([1, 2, 3, 4, 5], 0.15)
percentile([5, 4, 1, 3, 2], 0.35)
percentile([1, 2, 3, 4, 5], 0.44)
percentile([100, 101, 92, 4, 102, 66, 66], 0.65)
percentile([100, 101, 92, 4, 102, 32], 0.50)


//Ok but throws errors
percentile([], 0.50)
percentile([], 1.5)


// @ts-expect-error
percentile(1, 2, 3, 4, 5, 0.50);

// @ts-expect-error
percentile(1, 0.50);


// @ts-expect-error
percentile([1, '2', 3, 4, 5], 0.50);
// @ts-expect-error
percentile([false, true], 0.66);
// @ts-expect-error
percentile(undefined, 0.66);
// @ts-expect-error
percentile(null, 0.40);
