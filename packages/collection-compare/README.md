## just-compare

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-compare)

```js
import compare from 'just-compare';

// primitives: value1 === value2
// functions: value1.toString == value2.toString
// arrays: if length, sequence and values of properties are identical
// objects: if length, names and values of properties are identical
compare([1, [2, 3]], [1, [2, 3]]); // true
compare([1, [2, 3], 4], [1, [2, 3]]); // false
compare({a: 2, b: 3}, {a: 2, b: 3}); // true
compare({a: 2, b: 3}, {b: 3, a: 2}); // true
compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}]]); // false
compare([1, [2, {a: 4}], 4], [1, [2, {a: 4}], 4]); // true
compare(NaN, NaN); // true
```
