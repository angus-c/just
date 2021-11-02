type Primitive = boolean | string | number | bigint | null | undefined;

type KeyType = string | number | symbol;

declare function flip<T extends Record<KeyType, Primitive>>(
  obj: T
): { [U in keyof T as `${T[U]}`]: U };

export default flip;
