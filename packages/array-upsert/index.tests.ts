import upsert from './index';

upsert([1, 2, 3], 1, 22);
upsert([1, 2, 3], 22, 10);
upsert([], 'a', 1);
upsert<number | string>(['a', 'b', 'c'], 5, 2);

// @ts-expect-error
upsert();

// @ts-expect-error
upsert([1, 2, 3]);

// @ts-expect-error
upsert([1, 2, 3], 5);

// @ts-expect-error
upsert([1, 2, 3], 5, 'a');

// @ts-expect-error
upsert(['a', 'b', 'c'], 5, 2);

