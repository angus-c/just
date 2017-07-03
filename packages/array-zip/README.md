## just-zip-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-zip)

```js
import zip from 'just-zip-it';

zip([1, 2, 3]); // [[1], [2], [3]]
zip([1, 2, 3], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b'], [3, 'c']]
zip([1, 2], ['a', 'b'], [true, false]); //[[1, 'a', true], [2, 'b', false]]

zip(undefined, {}, false, 1, 'foo'); // []
zip([1, 2], ['a', 'b'], undefined, {}, false, 1, 'foo'); // [[1, 'a'], [2, 'b']]

zip([1, 2, 3], ['a', 'b'], [true]); // [[1, 'a', true], [2, 'b', undefined], [3, undefined, undefined]]
```
