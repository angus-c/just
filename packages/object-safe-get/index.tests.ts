import get from './index'

const arr = ['one', 'two'];
const obj = {foo: {bar: arr}};

// OK
get(arr, '0'); //
get(arr, ['0']); //
get(obj, 'foo.bar'); //
get(obj, 'foo.bar.0'); //

// Not OK
// @ts-expect-error
get(); //
// @ts-expect-error
get(obj); //
// @ts-expect-error
get([]); //
// @ts-expect-error
get({}); //
// @ts-expect-error
get(obj, 3); //
// @ts-expect-error
get(obj, [3]); //
// @ts-expect-error
get(false); //
// @ts-expect-error
get(null); //
// @ts-expect-error
get(undefined); //
