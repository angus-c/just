## just-split-at

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-split-at)

```js
import splitAt from 'just-split-at';

splitAt([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4, 5]]
splitAt([{a: 1}, {b: 1}, {c: 1}], -1); // [[{a: 1}, {b: 1}], [{c: 1}]]
splitAt([], 2); // [[], []]
splitAt(null, 1); // undefined
splitAt(undefined, 1); // undefined
```
