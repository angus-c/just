## just-array-unique

Part of a [library]('../README.md') of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

```js
unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]
var a = {a: 3};
var b = {b: 4};
var c = {c: 5};
unique([a, a, b, c, b]); // [a, b, c]
unique([1, '1', 2, '2', 3, 2]); // [1, 2, 3]
unique([1, '1', 2, '2', 3, 2], fuction(a, b) {return a === b}; // [1, '1', 2, '2', 3]
```
