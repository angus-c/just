// https://github.com/ronami/meta-typing/blob/master/src/tail/index.d.ts
type Tail<T extends Array<any>> =
  ((...t: T) => void) extends (h: any, ...rest: infer R) => void ? R : never;

/**
 * Return a list of Args such that the corresponding value is undefined.
 * @example PartialArgs<[number, string, boolean], [number, undefined, undefined]>
 *          equals to [string, boolean]
 * @example PartialArgs<[number, string, ...boolean[]], [undefined, string]>
 *          equals to [number, ...boolean[]]
 */
type PartialArgs<Args extends any[], Values extends any[], Output extends any[] = []>
  = [] extends Values
  ? [...Output, ...Args]
  : undefined extends Values[0]
  ? PartialArgs<Tail<Args>, Tail<Values>, [...Output, Args[0]]>
  : PartialArgs<Tail<Args>, Tail<Values>, Output>

declare function partial<Values extends any[], F extends (...args: any) => any>
  (func: F, ...args: Values)
  : (...args: PartialArgs<Parameters<F>, Values>) => ReturnType<F>

export default partial
