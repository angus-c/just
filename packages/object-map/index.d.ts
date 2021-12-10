declare function map<T, U = T>(
  item: Record<string, T>,
  callback: (key: string, value: T) => U
): Record<string, U>;

export default map;
