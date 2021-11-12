declare function mapValues<T, U = T>(
  item: Record<string, T>,
  callback: (value: T, key: string, object: Record<string, T>) => U
): Record<string, U>;

export default mapValues;
