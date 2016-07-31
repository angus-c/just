## just-pluck-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-pluck-it)

```js
import pluck from 'just-pluck-it';

pluck([{a:1, b:2}, {a:4, b:3}, {a:2, b:5}], 'a'); // [1, 4, 2]
pluck({x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}}, 'a'); // {x: 1, y: 4, z: 2}
```
