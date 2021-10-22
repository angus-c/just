import flatten from './index'

// OK
flatten([1, 2, 3]);
flatten([1, [2, 3], 4]);
flatten([1, [2, [3]], 4]);
flatten([1, [2, [3]], [[[[[4]]]]]]);
flatten([1, [2, [3]], [[[[[4]]]]]], 2);
flatten([1, [2, [3]], [[[[[4]]]]]], undefined);

// Not OK
// @ts-expect-error
flatten(5);
// @ts-expect-error
flatten(true);
// @ts-expect-error
flatten(null);
// @ts-expect-error
flatten({a: 5});
// @ts-expect-error
flatten([1], true);
// @ts-expect-error
flatten([1], "a");
// @ts-expect-error
flatten(1, 2);
// @ts-expect-error
flatten(new Map());
// @ts-expect-error
flatten(new Set());
