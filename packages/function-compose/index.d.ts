declare function compose<A extends unknown[], B>(f0: (...a: A) => B): (...a: A) => B;
declare function compose<A extends unknown[], B, C>(
  f0: (...a: A) => B,
  f1: (b: B) => C
): (...a: A) => C;
declare function compose<A extends unknown[], B, C, D>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D
): (...a: A) => D;
declare function compose<A extends unknown[], B, C, D, E>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D,
  f3: (d: D) => E
): (...a: A) => E;
declare function compose<A extends unknown[], B, C, D, E, F>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D,
  f3: (d: D) => E,
  f4: (e: E) => F
): (...a: A) => F;
declare function compose<A extends unknown[], B, C, D, E, F, G>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D,
  f3: (d: D) => E,
  f4: (e: E) => F,
  f5: (f: F) => G
): (...a: A) => G;
declare function compose<A extends unknown[], B, C, D, E, F, G>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D,
  f3: (d: D) => E,
  f4: (e: E) => F,
  f5: (f: F) => G,
  ...fs: ((g: G) => G)[]
): (...a: A) => G;
declare function compose<A extends unknown[], B, C, D, E, F, G>(
  f0: (...a: A) => B,
  f1: (b: B) => C,
  f2: (c: C) => D,
  f3: (d: D) => E,
  f4: (e: E) => F,
  f5: (f: F) => G,
  ...fs: Function[]
): (...a: A) => any;
export = compose
