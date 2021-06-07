## just-debounce-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-memoize-last)

```js
import memoizeLast from 'just-memoize-last';

const sumByOne = memoizeLast(function(value) {
  return value + 1;
});

sumByOne(10); // Returns value returned by the function
sumByOne(10); // Cache hit!

sumByOne(20); // Returns value returned by the function
sumByOne(20); // Cache hit!

// Returns always from cache, because the second function is returning true for all cases
const sum = memoize(function(a, b) {
  return a + b;
}, function(a, b) {
  return true;
});

sum(10, 10); // Returns value returned by the function
sum(10, 20); // Cache hit!
sum(10, 30); // Cache hit!
```
