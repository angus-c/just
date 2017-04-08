## just-values

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-values)

```js
const values = require('just-values');

values({a: 4, c: 8}); // [4, 8]
values({a: {aa: 2}, b: {bb: 4}}); // [{aa: 2}, {bb: 4}]
values({}); // []
values([1, 2, 3]); // [1, 2, 3]
values(function(a, b) {return a + b;}); // []
values(new String('hello')); // ['h', 'e', 'l', 'l', 'o']
values(1); // throws exception
values(true); // throws exception
values(undefined); // throws exception
values(null); // throws exception
```
