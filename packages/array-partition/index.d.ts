
/**
 * Seperates an array into two partitions, using resolver to determine which set each item should go in. Items that resolve to true, are placed in the first array.
 *
 * @param arr The array to partition. sort order is maintained.
 * @param resolver Determines which set the item goes in.
 *
 * @example
 * partition([1, 5, 2, 4, 3], n => n > 3);
 * // => [[5, 4], [1, 2, 3]]
 * partition(['a', 1, 2, 'b'], x => typeof x == 'string');
 * // => [['a', 'b'], [1, 2]]
 */
declare function partition<T, S extends T>(arr: T[], resolver: (arg: T) => arg is S): [S[], Exclude<T, S>[]];
declare function partition<T>(arr: T[], resolver: (arg: T) => boolean): [T[], T[]]
export default partition;
