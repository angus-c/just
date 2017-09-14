## just-split

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-split)

```js
import split from 'just-split';

split([]); // []
split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], '3'); [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split(['a', 'b', 'c', 'd', 'e'], 2); [['a', 'b'], ['c', 'd'], ['e']]
split([1, 2, 3, 4, 5, 6, 7, 8], 3); [[1, 2, 3], [4, 5, 6], [7, 8]]
```
