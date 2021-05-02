import clamp from './index'

type returnType = number
let returnValue: returnType

// OK
returnValue = clamp(1, 2, 3);

// Not OK
// @ts-expect-error
clamp('1', 2, 3);
// @ts-expect-error
clamp(undefined, 2, 3);
// @ts-expect-error
clamp(true, 2, 3);

// @ts-expect-error
clamp(1, '2', 3);
// @ts-expect-error
clamp(1, null, 3);
// @ts-expect-error
clamp(1, false, 3);

// @ts-expect-error
clamp(1, 2, '3');
// @ts-expect-error
clamp(1, 2, undefined);
// @ts-expect-error
clamp(1, 2, true);