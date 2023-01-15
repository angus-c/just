// Definitions by: Aryaman1706 <https://github.com/Aryaman1706>
// Modified by: Masa-Shin <https://github.com/Masa-Shin>

declare function flip<T extends (...args: any[]) => any>(fn: T):
  T extends () => any
  ? T
  : T extends (arg0: infer Arg0, arg1: infer Arg1, ...rest: infer Rest) => infer R
  ? (...args: [Arg1, Arg0, ...Rest]) => R
  : never;

export default flip;
