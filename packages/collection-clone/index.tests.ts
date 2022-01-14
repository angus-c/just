import clone from './index'

const array: string[] = [];
const object: object = {};

const arr = [1, 2, 3];
const subObj = { aa: 1 };
const obj = { a: 3, b: 5, c: arr, d: subObj };

// OK
clone(obj);
clone(object);
clone(/a/);
clone(new Date());
clone(array);
clone(() => array);
clone(() => {});
clone({ a: array });
clone([{ a: '' }]);

// Not OK
// @ts-expect-error
clone();
// @ts-expect-error
clone(1);
// @ts-expect-error
clone('');
// @ts-expect-error
clone(true);
// @ts-expect-error
clone(false);
// @ts-expect-error
clone();
