declare function values<T extends any[]>(obj: T): T;
declare function values<T extends String>(obj: T): string[];
declare function values<T extends Number|Boolean>(obj: T): never[];
declare function values<T extends Record<string, any>>(obj: T): T[keyof T][];

export default values
