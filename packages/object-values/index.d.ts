export declare function values<Arr extends unknown[]>(obj: Arr): Arr;
export declare function values<Obj extends object>(obj: Obj): Obj extends String ? Obj[number][]
	: Obj extends Number | Boolean ? unknown[]
	: Obj[keyof Obj][];
