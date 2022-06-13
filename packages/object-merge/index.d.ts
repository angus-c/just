// Definitions by: nokazn <https://github.com/nokazn>
declare function merge<
  TObj1 extends object = object,
  TObjs extends object = object
>(obj1: TObj1, ...objs: TObjs[]): TObj1 & TObjs;
export default merge;
