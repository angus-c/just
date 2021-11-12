/**
 * returns the last item in an array
 * @example
 * last([0, 1, 2, 3])
 * // => 3
 * last([])
 * // => undefined
 */
export default function last<T>(arr: readonly [...any, T]): T;
export default function last<T>(arr: T[]): T;
