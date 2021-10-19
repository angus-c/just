import leftPad = require('./index');

// OK

leftPad('hello', 9); // '    hello'
leftPad('hello', 3); // 'hello'
leftPad('hello', 9, '.'); // '....hello'
leftPad('hello', 9, '..'); // '....hello'
leftPad('hello', 10, 'ab'); // 'bababhello'
leftPad('hello', 9, '\uD83D\uDC04'); // '🐄🐄🐄🐄hello'
leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // '🐄🐑🐄🐑🐄hello'
leftPad('hello', 7, '🐄'), // '🐄🐄hello'

// NOT OK

// @ts-expect-error
leftPad(null, 7); // throws
// @ts-expect-error
leftPad([], 4, '*'); // throws
// @ts-expect-error
leftPad('hello', 4, true); // throws
// @ts-expect-error
leftPad('hello', -4, true); // throws
// @ts-expect-error
leftPad('hello', 2.3, true); // throws
