## just-function-partial

Part of a [library]('../README.md') of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

```js
var cubedRoot = partial(Math.pow, _, 1/3);
cubedRoot(10).toFixed(1); // 56.7
cubedRoot(35).toFixed(1); // 16.2
```  
