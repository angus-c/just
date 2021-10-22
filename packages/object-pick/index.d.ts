// Definitions by: Peter Safranek <https://github.com/pe8ter>
declare function pick<T, U extends keyof T>(obj: T, select: U[]): Pick<T, U>;
declare function pick<T, U extends keyof T>(obj: T, select1: U, ...selectn: U[]): Pick<T, U>;
export default pick;
