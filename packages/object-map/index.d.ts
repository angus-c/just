declare function map<K extends string | symbol, T, U = T>(
  item: Record<K, T>,
  callback: (key: K, value: T) => U,
): Record<K, U>

export default map
