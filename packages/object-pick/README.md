## just-pick

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-pick)

```js
import pick from 'just-pick';

var obj = { a: 3, b: 5, c: 9 };
pick(obj, ['a', 'c']); // {a: 3, c: 9}
pick(obj, 'a', 'c'); // {a: 3, c: 9}
pick(obj, ['a', 'b', 'd']); // {a: 3, b: 5}
pick(obj, ['a', 'a']); // {a: 3}
```
