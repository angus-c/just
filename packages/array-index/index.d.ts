/**
 * Indexes an array by {@link key} for each item in the array.
 *
 * If item is not indexable by key, or the value is undefined, that item is omitted from the result.
 *
 * Repeating keys replace the previous item.
 * @param arr the array to index
 * @param key the property to index item by
 * @example
 * index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');
 * // => {first: {id: 'first', val: 1}, second: {id: 'second', val: 2}}
 * index([{id: 'first', val: 1}, null], 'id');
 * // => {first: {id: 'first', val: 1}}
 * index([{id: 0, val: 0}, {id: 0, val: 1}], 'id');
 * // => {first: {id: 0, val: 1}}
 */
declare function index<T>(arr: readonly (T | null | undefined)[], key: string): Record<string, T>;
export default index;
