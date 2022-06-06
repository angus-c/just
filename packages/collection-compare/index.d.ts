// Definitions by: Justy Robles <https://github.com/justyrobles>

type Primitive = boolean | string | number | bigint | null | undefined;

declare function compare<T extends Primitive>(value1: T, value2: T): boolean;

declare function compare<T1 extends object, T2 extends object & T1>(
  value1: T1,
  value2: T2
): boolean;

declare function compare<T1 extends object & T2, T2 extends object>(
  value1: T1,
  value2: T2
): boolean;

export default compare;
