export default curry;

type MakeTuple<LEN extends number, T extends any = any, C extends T[] = []> = C['length'] extends LEN ? C : MakeTuple<LEN, T, [T, ...C]>
type CurryOverload<F extends (...args: any[]) => any, N extends unknown[], P extends unknown[]> =
  N extends [infer L, ...infer R]
  ? ((...args: [...P, L]) => CurryInternal<F, R>) & CurryOverload<F, R, [...P, L]>
  : () => CurryInternal<F, P>
type CurryInternal<F extends (...args: any[]) => any, N extends unknown[]> =
  0 extends N['length'] ? ReturnType<F> : CurryOverload<F, N, []>
type Curry<F extends (...args: any[]) => any, LEN extends number | undefined = undefined, I extends any = any> =
  0 extends (LEN extends undefined ? Parameters<F>['length'] : LEN)
  ? () => ReturnType<F>
  : CurryInternal<F, LEN extends undefined ? Parameters<F> : MakeTuple<LEN extends undefined ? 0 : LEN, I>>

declare function curry<F extends (...args: any[]) => any, L extends number>(
  fn: F,
  arity?: L | undefined,
) : Curry<F, number extends L ? undefined : L, Parameters<F>[number]>;
