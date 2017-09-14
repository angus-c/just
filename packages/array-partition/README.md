## just-partition

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-range)

```js
import range from 'just-partition';

partition([]); // []
partition([1,2,3,4,5]); // [[1,2,3,4,5]]
partition([1,2,3,4,5,6,7,8,9], 3); [[1,2,3],[4,5,6],[7,8,9]]
partition([1,2,3,4,5,6,7,8,9], "3"); [[1,2,3],[4,5,6],[7,8,9]]
partition(['a','b','c','d','e'], 2); [['a','b'],['c','d'],['e']]
partition([1,2,3,4,5,6,7,8], 3); [[1,2,3],[4,5,6],[7,8]]
```
