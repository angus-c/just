type Predicate<T extends object, Acc> =
  (acc: Acc, key: keyof T, value: T[keyof T], index: number, keys: Array<keyof T>) => Acc

export function reduce<T extends object, Acc>(
  obj: T,
  predicate: Predicate<T, Acc>,
  initialValue?: Acc
): Acc
