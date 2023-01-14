import deepOmit from './index';

const arr = ['one', 'two'];
const obj = {foo: {bar: arr}};
const obj2 = {foo: {bar: [1, 2]}};
// OK
deepOmit(arr, '0');
deepOmit(arr, ['0']);
deepOmit(obj, 'foo.bar');
deepOmit(obj, ['foo', 'bar']);
deepOmit(obj2, 'foo.bar.0');
deepOmit(obj2, ['foo', 'bar', '0']);

// Not OK
// @ts-expect-error
deepOmit();
// @ts-expect-error
deepOmit(obj);
// @ts-expect-error
deepOmit([]);
// @ts-expect-error
deepOmit({});
// @ts-expect-error
deepOmit(obj, 3);
// @ts-expect-error
deepOmit(obj, [3]);
// @ts-expect-error
deepOmit(false);
// @ts-expect-error
deepOmit(null);
// @ts-expect-error
deepOmit(undefined);
