// Definitions by: Justy Robles <https://github.com/justyrobles>

type Primitive = boolean | string | number | bigint | null | undefined;

declare function compare<T extends Primitive>(value1: T, value2: T): boolean;

declare function compare<T1 extends object, T2 extends T1>(
  value1: Exclude<T1, Primitive>,
  value2: Exclude<T2, Primitive>
): boolean;

declare function compare<T1 extends T2, T2 extends object>(
  value1: Exclude<T1, Primitive>,
  value2: Exclude<T2, Primitive>
): boolean;

export default compare;
