## just-object-empty

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-object-empty)

```js
import objectEmpty from 'just-object-empty';

let obj = {a: 3, b: 5};
objectEmpty(obj} // false

let obj = {};
objectEmpty(obj} // true

let obj = null;
objectEmpty(obj} // true
```
