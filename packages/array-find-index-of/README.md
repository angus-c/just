## just-find-index-of

Part of a [library](http://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-find-index-of)

```js
import findIndexOf from 'just-find-index-of';

var item = {c: 19};
var arrOfObjs = [{a: 5, b: 3}, {a: 7, b: 4}, {a: 7, b: 8}, {a: 5, b: 10}, {a: 9, b: item}];

findIndexOf(arrOfObjs, 'a', 5); // 0
findIndexOf(arrOfObjs, 'b', item); // 4
findIndexOf([[4,5,6,7], [3,4,5,6], [0,2,3,7]], 1, 2); // 2
findIndexOf(arrOfObjs, 'b', 5); // -1
findIndexOf([], 'b', 5); // -1
findIndexOf(arrOfObjs); // throws
findIndexOf(arrOfObjs, 'a'); // throws
findIndexOf(undefined, 'a', 3); // throws
```
