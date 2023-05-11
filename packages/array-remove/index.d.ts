export default function remove<T, U, V extends T>(arr1: readonly T[], arr2: readonly U[]): (V | Exclude<T, U>)[];
