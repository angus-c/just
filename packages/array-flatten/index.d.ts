type RecursiveList<T> = readonly (T | readonly T[] | RecursiveList<T>)[];

/**
 * Flattens an array
 * @param arr the arary to flatten
 * @param depth number of times to flatten the array. Flattens fully if omitted.
 *
 * @example
 * flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
 * // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]], 1);
 * // => [1, [2, 3], [[4, 5], 6, 7, [8, 9]]]
 */
declare function flatten<T>(arr: RecursiveList<T>, depth?: number): T[];
export default flatten;
