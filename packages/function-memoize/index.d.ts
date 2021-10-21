type func = (...args: any) => any

export declare function memoize<T extends func>(callback: T, resolver?: (...args: Parameters<T>) => string)
