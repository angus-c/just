type RecursiveList<T> = (T | T[] | RecursiveList<T>)[];

declare function flatten<T>(list: RecursiveList<T>, depth? : number): T[];
export default flatten;
