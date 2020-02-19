## just-group-by

Part of a [library](http://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-group-by)

```js
import groupBy from 'just-group-by';

groupBy([6.1, 4.2, 6.3], Math.floor); // { '4': [4.2], '6': [6.1, 6.3] }
groupBy([1,2,3,4,5,6,7,8], function(i) { return i % 2}); // { '0': [2, 4, 6, 8], '1': [1, 3, 5, 7] }
```
