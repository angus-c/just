import permutations from './index';

// OK
const test1: number[][] = permutations([1]);
const test2: number[][] = permutations([1, 2, 3, 4, 5]);
const test3: (string | boolean)[][] = permutations(['a', true])
const test4: (string | boolean | number)[][] = permutations([true, 'a', 1, false])

const numbers: number[] = []
let test5: number[][] = permutations(numbers)

// Not OK
// @ts-expect-error
permutations();
// @ts-expect-error
permutations(null);
// @ts-expect-error
permutations(1);
// @ts-expect-error
permutations("a");
// @ts-expect-error
permutations({});
// @ts-expect-error
permutations({ a: 1 });
// @ts-expect-error
permutations([], 1);
// @ts-expect-error
permutations([], []);
