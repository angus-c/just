export default memoizeLast;
declare function memoizeLast<T extends Function>(
  fn: T,
  isEqual?: (args1: any, args2: any) => boolean
): T
