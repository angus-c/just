import curry from './index'

function add(a: number, b: number, c: number) {
  return a + b + c;
}

// OK
curry(add);
curry(add)(1);
curry(add)(1)(2);
curry(add)(1)(2)(3);

curry(add, 1);
curry(add, 1)(1);

function many(a: string, b: number, c: boolean, d: bigint, e: number[], f: string | undefined, g: Record<any, any>): boolean {
  return true
}
const return1 = curry(many)('')(123)(false)(BigInt(2))([1])(undefined)({})
const return2 = curry(many)('', 123)(false, BigInt(2))([1], '123')({})
const return3 = curry(many)('', 123, false)(BigInt(2), [1], undefined)({})
const return4 = curry(many)('', 123, false, BigInt(2))([1], undefined, {})
const return5 = curry(many)('', 123, false, BigInt(2), [1])(undefined, {})
const return6 = curry(many)('', 123, false, BigInt(2), [1], undefined)({})
const return7 = curry(many)('', 123, false)(BigInt(2), [1])(undefined)({})
const returns: boolean[] = [return1, return2, return3, return4, return5, return6, return7]

function dynamic(...args: string[]): number {
  return args.length
}
const dy1 = curry(dynamic, 1)('')
const dy2 = curry(dynamic, 2)('')('')
const dy3 = curry(dynamic, 3)('')('')('')
const dys: number[] = [dy1, dy2, dy3]

// not OK
// @ts-expect-error
curry(add, 1)(1)(2);
// @ts-expect-error
curry(add, 1)(1)(2)(3);
// @ts-expect-error
curry(add, 4)('');

// @ts-expect-error
curry(many)(123)
// @ts-expect-error
curry(many)('', 123)(123)
// @ts-expect-error
curry(many)('', 123, true)('')
// @ts-expect-error
curry(many)('', 123, true, BigInt(2))('')
// @ts-expect-error
curry(many)('', 123, true, BigInt(2), [1])(123)
// @ts-expect-error
curry(many)('', 123, true, BigInt(2), [1,1], '')('')
// @ts-expect-error
curry(dynamic)(123)

// @ts-expect-error
curry();
// @ts-expect-error
curry(add, {});
// @ts-expect-error
curry(add, 'abc')(1);
// @ts-expect-error
curry(1);
// @ts-expect-error
curry('hello');
// @ts-expect-error
curry({});
// @ts-expect-error
curry().a();
