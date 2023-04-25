// Definitions by: daniel0mullins <https://github.com/daniel0mullins>
declare function has(
  obj: Record<keyof any, unknown> | undefined,
  propsArg: Array<string> | Symbol | string
): boolean;
export default has;
