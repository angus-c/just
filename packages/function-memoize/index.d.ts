type func = (...args: any) => any
export default function memoize<T extends func>(callback: T, resolver?: (...args: Parameters<T>) => string)
