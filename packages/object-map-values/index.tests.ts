import map from './index'

const obj = {foo: {bar: []}};

// OK
map(obj, (value) => value + 1);
map(obj, (value, key) => value + 2);
map(obj, (value, key, object) => value + 3);

// not OK
// @ts-expect-error
map();
// @ts-expect-error
map((value) => value + 1);
// @ts-expect-error
map(obj);
// @ts-expect-error
map(obj, '');
// @ts-expect-error
map(obj, {});
