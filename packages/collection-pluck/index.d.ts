declare function pluck<
  P extends string | number | symbol,
  O extends Record<P, unknown>,
>(collection: O[], propertyName: P): O[P][];
declare function pluck<
  P extends string | number | symbol,
  O extends Record<P, unknown>
>(collection: Partial<O>[], propertyName: P): Partial<O>[P][];
declare function pluck<
  P extends string | number | symbol,
  K extends string | number | symbol,
  C extends {[k in K]: Partial<Record<P, unknown>>}
>(
  collection: C,
  propertyName: P,
): {[k in K]: C[k][P]}
export = pluck;
