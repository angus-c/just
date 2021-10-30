import mean from './index';

// OK
let test1: number;
test1 = mean([1, 2, 3, 2, 4, 1]);
test1 = mean(1, 2, 3, 2, 4, 1);
test1 = mean([4]);
test1 = mean(4);

// OK but throws
mean([])
mean()

// Not OK

// @ts-expect-error
mean([1, '2', 3, 4]);
// @ts-expect-error
mean({ a: 2 });
// @ts-expect-error
mean(null);
// @ts-expect-error
mean(undefined);
