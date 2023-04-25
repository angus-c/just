declare function filter<Arg extends keyof any, K extends Arg, V>(
  obj: Record<K, V>,
  fn: (key: Arg, value: V) => boolean
): Partial<Record<K, V>>;

export default filter;
