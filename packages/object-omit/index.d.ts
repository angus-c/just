/**
 * The opposite of `just-pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @category Object
 * @returns A new object with specified keys omitted from the source `object`.
 * @example
```ts
var obj = {a: 3, b: 5, c: 9};
omit(obj, ['a', 'c']); // {b: 5}
omit(obj, a, c); // {b: 5}
omit(obj, ['a', 'b', 'd']); // {c: 9}
omit(obj, ['a', 'a']); // {b: 5, c: 9}
```
 */
declare function omit<T extends object, K extends keyof T>(
/**
 * The source object.
 */
obj: T | null | undefined, 
/**
 * The property names to omit.
 */
remove: keyof T | Array<K | ReadonlyArray<K>>, 
/**
 * The property names to omit.
 */
...rest: Array<K | ReadonlyArray<K>>): any;
export = omit;
