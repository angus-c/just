// Definitions by: Aziz Khambati <https://github.com/azizhk>
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

type MethodTypes = {
  cancel: () => void;
  flush: () => void;
}

export = debounce;

declare function debounce<T extends Function>(
  fn: T,
  wait?: 0,
  callFirst?: boolean
): T & MethodTypes;

declare function debounce<T extends Function>(
  fn: T,
  wait: number,
  callFirst: true
): T & MethodTypes;

declare function debounce<T extends Function>(
  fn: T,
  wait: number,
  callFirst?: false
): ((...args: ArgumentTypes<T>) => void) & MethodTypes;
