## just-last

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-last)

```js
import last from 'just-last';

last([1, 2, 3, 4, 5]); // 5
last([{a: 1}, {b: 1}, {c: 1}]); // {c: 1}
last([true, false, [true, false]]); // [true, false]
last(); // undefined
last([]); // undefined
last(null); // undefined
last(undefined); // undefined
```  
