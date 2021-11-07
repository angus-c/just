declare function prune<T extends string>(string: T): T;
declare function prune(string: string, length: number): string;
declare function prune(string: string, length: number, suffix: string): string;
export default prune;
