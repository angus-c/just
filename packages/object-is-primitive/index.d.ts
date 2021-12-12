declare function isPrimitive<T>(value: T): T extends object ? false : true;

export default isPrimitive;
