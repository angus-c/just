## just-entries

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-entries)

```js
import entries from 'just-entries';

// Object:
entries({c: 8, a: 4}); // [['c', 8], ['a', 4]]
entries({b: {bb: 4}, a: {aa: 2}}); // [['b', {bb: 4}], ['a', {aa: 2}]]
entries({}); // []

// Array:
entries([{c: 8}, {a: 4}]); // [[0, {c: 8}], [1, {a: 4}]]
entries(['À', 'mauvais', 'ouvrier', 'point', 'de', 'bon', 'outil'])
// [[0, 'À'], [1, 'mauvais'] ... [6, 'outil']]
entries([]); // []
```
