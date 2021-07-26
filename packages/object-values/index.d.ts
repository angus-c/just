export default function values<Arr extends unknown[]>(obj: Arr): Arr;
export default function values<Obj extends object>(obj: Obj): Obj[keyof Obj][];