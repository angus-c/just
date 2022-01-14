// Definitions by: Aryaman1706 <https://github.com/Aryaman1706>
declare function map<T extends object = object>(
  obj: T,
  predicate: (value: any, key: string | number, object: T) => string | number
): object;
export default map;
