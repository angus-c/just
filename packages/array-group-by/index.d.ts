/**
 * Groups items in array, using {@link resolver} to get the key to group by.
 * @param arr the array to group
 * @param resolver function used to resolve group key
 */
export default function groupBy<T, G extends keyof any = keyof any>(
  arr: readonly T[],
  resolver: (arg: T) => G
): Record<G, T[]>;
