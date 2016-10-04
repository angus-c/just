## just-random

Part of a [library](http://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-shuffle)

```js
import shuffle from 'just-shuffle';

shuffle([1, 2, 3]); // array with original elements randomly sorted
shuffle([1]); // [1]
shuffle(); // undefined
shuffle(undefined); // undefined
shuffle(null); // undefined
shuffle({}); // undefined
```
