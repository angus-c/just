// Definitions by: Peter Safranek <https://github.com/pe8ter>
declare function extend(obj1: Record<keyof any, string>, ...objn: any[]): Record<keyof any, string>;
declare function extend(deep: boolean, obj1: Record<keyof any, string>, ...objn: any[]): Record<keyof any, string>;
export default extend;
