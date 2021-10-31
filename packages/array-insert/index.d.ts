/**
 * Inserts a values into an array, returning the modified array.
 * @param arr Array to modify.
 * @param val Value or values to insert.
 * @param index Index to insert val. If omitted, defaults to 0.
 * @example
 * insert([1, 2, 5, 6], 'a', 2);
 * // => [1, 2, 'a', 5, 6]
 * insert([1, 2, 5, 6], ['a', 'c', 'e']);
 * // => ['a', 'c', 'e', 1, 2, 5, 6]
 * insert([1, 2, 5, 6], ['a', 'c', 'e'], 2);
 * // => [1, 2, 'a', 'c', 'e', 5, 6]
 */
export default function insert<T, U>(arr: T[], val: U[] | U, index?: number): (T | U)[]
