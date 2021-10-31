//provide as accurate typing as we can up to a point...
//this repetitiveness is a limitation of typescript
declare function zip<T>(...arr: [ T[] ]): [T][]
declare function zip<T, U>(...arr: [ T[], U[] ]): [T, U][]
declare function zip<T, U, V>(...arr: [ T[], U[], V[] ]): [T, U, V][]
declare function zip<T, U, V, W>(...arr: [ T[], U[], V[], W[] ]): [T, U, V, W][]
declare function zip<T, U, V, W, X>(...arr: [ T[], U[], V[], W[], X[] ]): [T, U, V, W, X][]
declare function zip<T, U, V, W, X, Y>(...arr: [ T[], U[], V[], W[], X[], Y[] ]): [T, U, V, W, X, Y][]
declare function zip<T, U, V, W, X, Y, Z>(...arr: [ T[], U[], V[], W[], X[], Y[], Z[] ]): [T, U, V, W, X, Y, Z][]
declare function zip(...arr: any[][]): any[][]

export default zip
