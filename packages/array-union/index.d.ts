export default function union<T extends any[], U extends any[]>(
  arr1: T,
  arr2: U
): [...T, ...U];
export default function union<
  T extends readonly any[],
  U extends readonly any[]
>(arr1: T, arr2: U): [...T, ...U];
