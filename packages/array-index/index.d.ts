declare function index<T extends object>(list: Array<T|null|undefined>, key: keyof T): Record<string, T>;
export = index;
