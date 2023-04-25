// Definitions by: Aryaman1706 <https://github.com/Aryaman1706>
declare function map<T extends Record<keyof any, unknown>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, object: T) => keyof any
): Record<ReturnType<typeof predicate>, T[keyof T]>;
export default map;
