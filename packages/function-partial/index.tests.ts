import partial from './index';

// Case 1) one aurgument.
const sqrt = partial(Math.sqrt);
sqrt(16);

// @ts-expect-error
sqrt();
// @ts-expect-error
sqrt(2, 2);
// @ts-expect-error
sqrt(true);

const sqrtOf16 = partial(Math.sqrt, 16);
sqrtOf16();

// @ts-expect-error
sqrtOf16(16);

// Case 2) Two arguments.
const repeat = (str: string, n: number) => {
  return str.repeat(n);
};

const anotherRepeat = partial(repeat);
anotherRepeat('a', 2);

// @ts-expect-error
anotherRepeat();
// @ts-expect-error
anotherRepeat('a');
// @ts-expect-error
anotherRepeat(2);
// @ts-expect-error
anotherRepeat(2, 'a');

const repeatHello = partial(repeat, 'hello, ');
repeatHello(10);

// @ts-expect-error
repeatHello();
// @ts-expect-error
repeatHello([]);

const repeat3Times = partial(repeat, undefined, 3);
repeat3Times('hello, ');

// @ts-expect-error
repeat3Times();
// @ts-expect-error
repeat3Times({});

const repeatHello3Times = partial(repeat, 'hello, ', 3);
repeatHello3Times();

// @ts-expect-error
repeatHello3Times(1, 2, 3);

// Case 3) three arguments.
const getFormattedPrice = (amount: number, unit: string, includeTax: boolean) => {
  const tax = includeTax ? 1.1 : 1;
  return `${unit}${amount * tax}`;
};

const anotherGetFormattedPrice = partial(getFormattedPrice);
anotherGetFormattedPrice(100, '$', true);

// @ts-expect-error
anotherGetFormattedPrice({});

const getFormattedPriceWithTax = partial(getFormattedPrice, undefined, undefined, true);
getFormattedPriceWithTax(100, '€');

const getFormattedPriceInUS = partial(getFormattedPrice, undefined, '$', undefined);
getFormattedPriceInUS(100, false);

const getFormattedCookiePrice = partial(getFormattedPrice, 100, undefined, undefined);
getFormattedCookiePrice('$', false);

const getFormattedCookiePriceInUS = partial(getFormattedPrice, 100, '$', undefined);
getFormattedCookiePriceInUS(true);

const getFormattedCookiePriceWithoutTax = partial(getFormattedPrice, 100, undefined, false);
getFormattedCookiePriceWithoutTax('¥');

const getFormattedPriceWithTaxInUS = partial(getFormattedPrice, undefined, '$', true);
getFormattedPriceWithTaxInUS(10000);

const getFormattedCookiePriceWithTaxInUS = partial(getFormattedPrice, 100, '$', true);
getFormattedCookiePriceWithTaxInUS();

// Case 4) arbitrarily many arguments.
const consoleLog = partial(console.log);
consoleLog('hello', ', ', 'world');

const logHello = partial(console.log, 'Hello');
logHello();

const logHelloWorld = partial(console.log, 'Hello', ', ', 'world');
logHelloWorld();

const logGreetWorld = partial(console.log, undefined, ', ', 'world');
logGreetWorld('Good Afternoon');

const logGreetToSomeone = partial(console.log, undefined, ', ');
logGreetToSomeone('Good Afternoon', 'World', '!');
