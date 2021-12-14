import pluck = require('./index')

// Fixtures
const objpartial: {x?: number} = {}
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
const xy: 'x' | 'y' = 'x'

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
var aj: unknown[] = pluck([{}], 'a');
var ak: unknown[] = pluck([{}], 0);
var al: (number | undefined)[] = pluck([{a: 1}, {}], 'a');
var am: (number | undefined)[] = pluck([{x: 1}, objpartial], 'x');
var an: (number | string)[] = pluck([{x: 1, y: 'a'}, {x: 2, y: 'b'}], xy)

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
var oj: {a: unknown} = pluck({a: {}}, 'a');
var ok: {a: unknown} = pluck({a: {}}, 0);
var ol: {a: string, b: unknown} = pluck({a: {x: 'a'}, b: {}}, 'x');
var om: {a: string, b?: number} = pluck({a: {x: 'a'}, b: objpartial}, 'x');
var on: {a: string | null, b: number} = pluck({a: {x: 'a', y: null}, b: {x: 1, y: 2}}, xy)

// NG
// @ts-expect-error
pluck()

// Array
// @ts-expect-error
pluck([])
// @ts-expect-error
pluck([], {})
// @ts-expect-error
pluck([], [])
// @ts-expect-error
pluck([], null)

// Object
// @ts-expect-error
pluck({})
// @ts-expect-error
pluck({}, {})
// @ts-expect-error
pluck({}, [])
// @ts-expect-error
pluck({}, null)
