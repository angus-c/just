// Definitions by: nokazn <https://github.com/nokazn>
declare function merge<
  TObj1 extends Record<keyof any, unknown>,
  TObjs extends Record<keyof any, unknown>
>(obj1: TObj1, ...objs: TObjs[]): TObj1 & TObjs;
export default merge;
