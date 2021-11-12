/**
 * Finds all values shared between two arrays.
 * @example
 * intersect([1, 2, 5, 6], [2, 3, 5, 6]);
 * // => [2, 5, 6]
 * intersect([1, 2, 2, 4, 5], [3, 2, 2, 5, 7]);
 * // => [2, 5]
 */
export default function intersect<T, U, I extends T | U>(arr1: T[], arr2: U[]): I[];
export default function intersect<T, U, I extends T | U>(arr1: readonly T[], arr2: readonly U[]): I[];
