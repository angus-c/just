## just-map-object

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-map-object)

```js
import map from 'just-map-object';

// returns a new object with the predicate applied to each value
map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (value, index) => index); // {a: 0, b: 1, c: 2}
map({a: 3, b: 5, c: null}, (value, index) => Boolean); // {a: true, b: true, c: false}
map({a: 3, b: 5, c: 9}, (key, value, obj) => obj[i + 1]); // {a: 5, b: 9, c: undefined}
```
