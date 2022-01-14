// NaN and document.all are also falsy but they cannot be represented as a type
type Falsy = false | null | undefined | '' | 0 | 0n;

/**
 * Removes all falsy values from an array
 * @example
 * compact([1, null, 2, undefined, NaN, 3, 4, false, 5]);
 * // => [1, 2, 3, 4, 5]
 * compact([1, 2, [], 4, {}]);
 * // => [1, 2, [], 4, {}]
 */
export default function compact<T>(arr: (Falsy | T)[]): T[];
