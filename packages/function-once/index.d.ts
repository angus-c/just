declare function once<Func extends (...args: unknown[]) => unknown>(fn: Func): Func
export default once
