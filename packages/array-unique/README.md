## just-array-unique

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

```js
import unique from 'just-unique';

unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]); // [1, 2, 3, 4]
const a = {a: 3};
const b = {b: 4};
const c = {c: 5};
unique([a, a, b, c, b]); // [a, b, c]
unique([1, '1', 2, '2', 3, 2]); // [1, 2, 3]
unique([1, '1', 2, '2', 3, 2], (a, b) => a === b); // [1, '1', 2, '2', 3]
```
