## just-map-object

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-map-object)

```js
import map from 'just-map-keys';

// predicate updates keys, receives (value, key, object)
map({a: 'cow', b: 'sheep', c: 'pig'}, (value) => value);
  // {cow: 'cow', sheep: 'sheep', pig: 'pig'}
map([4, 5, 6], (value, key) => key + 1); // {1: 4, 2: 5, 3: 6}
map({a: 3, b: 5, c: 9}, (value, key) => key + value); // {a3: 3, b5: 5, c9: 9}
map({a: 3, b: 5, c: 9}, (value, key, obj) => obj.b + value + key);
  // {'8a': 3, '10b': 5, '14c': 9}
```
