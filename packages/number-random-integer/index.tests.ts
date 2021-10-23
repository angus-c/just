import random from './index'

// OK
random();
random(999);
random(5, 10);

// NOT OK

// @ts-expect-error
random('just');

// @ts-expect-error
random(5, 'just');

// @ts-expect-error
random(5, {val: 1, foo: 2});

// @ts-expect-error
random(5, ['a', 'b']);

// @ts-expect-error
random(5, function () {});
