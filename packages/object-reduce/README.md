## just-reduce-object

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-reduce-object)

```js
import reduce from 'just-reduce-object';

// applies a function against an accumulator and each key-value pairs of the object
// to reduce it to a single value
reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc[value] = key;
  return acc;
}, {}); // {3: 'a', 5: 'b', 9: 'c'}

reduce({a: 3, b: 5, c: 9}, (acc, key, value, index, keys) => {
  acc += value;
  return acc;
}); // 17
```
