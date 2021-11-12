// Definations by: Aryaman1706 <https://github.com/Aryaman1706>
declare function map<T extends object = object>(
  obj: T,
  predicate: (
    key: T extends Array<any> ? string : keyof T,
    value: T extends Array<infer R> ? R : T[keyof T]
  ) => any
): {
  [key in keyof T]: any;
};
export default map;
