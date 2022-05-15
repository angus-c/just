//provide as accurate typing as we can up to a point...
//this repetitiveness is a limitation of typescript
declare function zip<T>(...arr: [ readonly T[] ]): [T][]
declare function zip<T, U>(...arr: [ readonly T[], readonly U[] ]): [T, U][]
declare function zip<T, U, V>(...arr: [ readonly T[], readonly U[], readonly V[] ]): [T, U, V][]
declare function zip<T, U, V, W>(...arr: [ readonly T[], readonly U[], readonly V[], readonly W[] ]): [T, U, V, W][]
declare function zip<T, U, V, W, X>(...arr: [ readonly T[], readonly U[], readonly V[], readonly W[], readonly X[] ]): [T, U, V, W, X][]
declare function zip<T, U, V, W, X, Y>(...arr: [ readonly T[], readonly U[], readonly V[], readonly W[], readonly X[], readonly Y[] ]): [T, U, V, W, X, Y][]
declare function zip<T, U, V, W, X, Y, Z>(...arr: [ readonly T[], readonly U[], readonly V[], readonly W[], readonly X[], readonly Y[], readonly Z[] ]): [T, U, V, W, X, Y, Z][]
declare function zip(...arr: ReadonlyArray<any>[]): any[][]

export default zip
