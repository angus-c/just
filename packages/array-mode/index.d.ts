/**
 * Finds the mode of a set of numbers. Returns an array if there is more than one mode.
 * @example
 * mode([1, 2, 3, 2]);
 * // => 2
 * mode(4, 4, 1, 4);
 * // => 4
 * mode(1, 2, 1, 2, 3)
 * // => [1, 2]
 */
export default function mode(arr: number[]): number | number[];
export default function mode(...arr: number[]): number | number[];
