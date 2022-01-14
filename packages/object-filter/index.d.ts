type PlainObject<T> = T extends Map<any, any> | Set<any> | null ? never :
  T extends object ? T :
  never;

declare function filter<T>(
  obj: PlainObject<T>,
  fn: (key: keyof T, value: T[typeof key]) => any
): Partial<T>;
export default filter;
