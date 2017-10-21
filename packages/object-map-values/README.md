## just-map-object

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-map-object)

```js
import map from 'just-map-values';

// predicate updates values, recieves (value, key, obj)
map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (value, key) => value + key); // {a: 3a, b: 5b, c: 9c}
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b); // {a: 5, b: 5, c: 5}
```
