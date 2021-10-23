import set from './index'

const arr = ['one', 'two'];
const obj = {foo: {bar: arr}};

// OK
set(arr, '0', {});
set(arr, ['0'], '');
set(obj, 'foo.bar', 0);
set(obj, 'foo.bar.0', 1);
set(obj, 'foo.bar', {});
set(obj, 'foo.bar.0', {});
set(obj, 'foo.bar', function(){});
set(obj, 'foo.bar.0', function(){});


// Not OK
// @ts-expect-error
set();
// @ts-expect-error
set(obj);
// @ts-expect-error
set([]);
// @ts-expect-error
set({});
// @ts-expect-error
set(obj, 3);
// @ts-expect-error
set(obj, [3]);
// @ts-expect-error
set(false);
// @ts-expect-error
set(null);
// @ts-expect-error
set(undefined);
// @ts-expect-error
set(obj, 'foo.bar');
