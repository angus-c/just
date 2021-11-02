declare function once<Func extends (...args: any[]) => any>(fn: Func): Func
export default once
