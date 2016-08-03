## just-last

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-last)

```js
import last from 'just-tail';

tail([1, 2, 3, 4, 5]); // [2, 3, 4, 5]
tail([{a: 1}, {b: 1}, {c: 1}]); // [{b: 1}, {c: 1}]
tail([true, false, [true, false]]); // [false, [true, false]]
tail([]); // []
tail(); // undefined
tail(null); // undefined
tail(undefined); // undefined
```  
