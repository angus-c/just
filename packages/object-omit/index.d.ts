declare function omit<Obj extends object, Key extends string>(obj: Obj, remove: Key[]): Omit<Obj, Key>;
declare function omit<Obj extends object, Key extends string>(obj: Obj, remove1: Key, ...removeN: Key[]): Omit<Obj, Key>;
export default omit
