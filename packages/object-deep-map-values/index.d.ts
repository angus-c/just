type RecursiveObject<T> = { [key: string]: T | RecursiveObject<T> };
type MapFunction<T, U> = (value: T, key: string) => U;

declare function deepMapValues<T, U = T>(
  obj: RecursiveObject<T>,
  fn: MapFunction<T, U>
): RecursiveObject<U>;
export default deepMapValues;
