import modulo from './index'

type returnType = number
let returnValue: returnType

// OK
returnValue = modulo(7, 5);

// Not OK
// @ts-expect-error
modulo(12);
// @ts-expect-error
modulo(12, 'apple');
// @ts-expect-error
modulo(12, {});
// @ts-expect-error
modulo(null, 12);
// @ts-expect-error
modulo('bee', 9);
// @ts-expect-error
modulo(null, undefined); // NaN