export default function entries<T extends any[]>(obj: T): [number, T[number]][];
export default function entries<T extends object>(obj: T): [keyof T, T[keyof T]][];