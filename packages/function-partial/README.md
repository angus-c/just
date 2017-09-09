## just-partial-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-partial-it)

```js
import partial from 'just-partial-it';

const cubedRoot = partial(Math.pow, _, 1/3);
cubedRoot(64); // 4

const getRoot = partial(Math.pow, 64);
getRoot(1/2); // 8
```  
