import pluck = require('./index')

// Fixtures
const enum E1 {
  A,
  B,
};
const enum E2 {
  A = "A",
  B = "B",
};
const sym1 = Symbol();
const sym2 = Symbol();

// OK

// Array
var aa: string[] = pluck([{x:'abc', y:'def'}], 'x');
var ab: number[] = pluck([{a:1, b:2}, {a:4, b:3}, {a:2, b:5}], 'a');
var ac: (string | number)[] = pluck([{x:'abc', y:'def'}, {x: 123, y: 4}, {x: ''}], 'x');
var ad: number[] = pluck([{0: 1}], 0);
var ae: number[] = pluck([[0, 1] as const, [2, 3] as const], 1);
var af: never[] = pluck([], 'a');
var ag: number[] = pluck([{[E1.A]: 0}, {[E1.A]: 1}], E1.A);
var ah: number[] = pluck([{[E2.A]: 0}, {[E2.A]: 1}], E2.A);
var ai: number[] = pluck([{[sym1]: 0}], sym1);

// Object
var oa: {
  x: number,
  y: string,
  z: number,
} = pluck({x: {a: 1, b: 2}, y: {a: 'foo', b: 3}, z: {a: 2, b: 5}}, 'a');
var ob: Record<string, number> = pluck(
  {a: {x: 1}, b: {x: 100}} as Record<string, Record<'x', number>>,
  'x'
);
var oc: {
  a: string
  b: number
} = pluck({a: {7: 'abc'}, b: {7: 123}}, 7);
var od: {
  1: string,
  2: null
} = pluck({1: {a: 'abc'}, 2: {a: null}}, 'a');
var oe: {
  a: string,
  b: {}
} = pluck({a: [null, 'abc'] as const, b: [0, {}] as const}, 1);
var of: {} = pluck({}, 'a');
var og: {a: number} = pluck({a: {[E1.A]: 0}}, E1.A);
var oh: {a: number} = pluck({a: {[E2.A]: 0}}, E2.A);
var oi: {a: number} = pluck({a: {[sym1]: 0}}, sym1);

// NG

// Array
// @ts-expect-error
pluck([{}], 'a');
// @ts-expect-error
pluck([{}], 0);
// @ts-expect-error
pluck([{a: 1}, {b: 2}], 'a');
// @ts-expect-error
pluck([{[E1.A]: 0}, {[E1.A]: 1}], E1.B);
// @ts-expect-error
pluck([{[E2.A]: 0}, {[E2.A]: 1}], E2.B);
// @ts-expect-error
pluck([{[sym1]: 0}], sym2);

// Object
// @ts-expect-error
pluck({a: {}}, 'a');
// @ts-expect-error
pluck({a: {}}, 0);
// @ts-expect-error
pluck({a: {x: 1}, b: {y: 2}}, 'x');
// @ts-expect-error
pluck({a: {[E1.A]: 0}}, E1.B);
// @ts-expect-error
pluck({a: {[E2.A]: 0}}, E2.B);
// @ts-expect-error
pluck({a: {[sym1]: 0}}, sym2);
