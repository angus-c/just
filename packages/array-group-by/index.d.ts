/**
 * Groups items in array, using {@link resolver} to get the key to group by.
 * @param arr the array to group
 * @param resolver function used to resolve group key
 */
export default function groupBy<T>(arr: readonly T[], resolver: (arg: T) => keyof any): Record<keyof any, T[]>
