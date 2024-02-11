import isNumeric from './index';

// OK
isNumeric('1');
isNumeric(1);
isNumeric('1.1');
isNumeric(1.1);

// Not OK
// @ts-expect-error
isNumeric([]);
// @ts-expect-error
isNumeric({});
// @ts-expect-error
isNumeric();
// @ts-expect-error
isNumeric(false);
// @ts-expect-error
isNumeric(null);
