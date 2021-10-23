import range from './index'

// OK
range(5);
range(5, 6);
range(10, 50, 10);
range(5, null);
range(5, null, null);
range(5, 10, null);
range();

// Not OK
// @ts-expect-error
range(5, "abc");
// @ts-expect-error
range(5, true);
// @ts-expect-error
range(5, 10, true);
// @ts-expect-error
range("abc");
// @ts-expect-error
range(null);
// @ts-expect-error
range(5, 10, 15, 20);

