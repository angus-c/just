## just-array-last

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

```js
import last from 'just-array-last';

last([1, 2, 3, 4, 5]); // 5
last([{a: 1}, {b: 1}, {c: 1}]); // {c: 1}
last([true, false, [true, false]]); // [true, false]
```  
