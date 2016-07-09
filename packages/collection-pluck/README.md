## just-pluck-it

Part of a [library]('../../README.md') of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

```js
import pluck from 'just-pluck-it';

var arr = [{a:1, b:2}, {a:4, b:3}, {a:2, b:5}];
pluck(arr, 'a'); // [1, 4, 2]
var obj = {x: {a:1, b:2}, y: {a:4, b:3}, z: {a:2, b:5}];
pluck(obj, 'a'); // {x: 1, y: 4, z: 2}
```
