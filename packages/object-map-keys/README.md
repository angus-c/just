## just-map-object

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-map-object)

```js
import map from 'just-map-object';

// predicate updates keys, recieves (value, key, object)
map({a: 3, b: 5, c: 9}, (value) => value + 1); // {a1: 3, b1: 5, c1: 9}
map([4, 5, 6], (key) => key + 1); // [0, 4, 5, 6]
map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
map({a: 3, b: 5, c: 9}, (value, key, object) => key + object.b); // {a5: 3, b5: 5, c5: 9}
```
