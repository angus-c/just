import standardDeviation from "./index"

//OK
standardDeviation(3, 2, 1);
standardDeviation([1, 2, 3, 2, 4, 1]);
standardDeviation(1, 2, 3, 4, 5, -6);
standardDeviation([1, 2, 3, 4, 9]);

//OK But throws
standardDeviation([4]);
standardDeviation([]);
standardDeviation()


// @ts-expect-error
standardDeviation(["3", 2]); // throws
// @ts-expect-error
standardDeviation(2, '3')
// @ts-expect-error
standardDeviation(null)
// @ts-expect-error
standardDeviation(undefined)
