## just-memoize

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-once)

```js
import memoize from 'just-memoize';

const sumByOne = memoize(function(value) {
  return value + 1;
});

sumByOne(10); // Returns value returned by the function
sumByOne(10); // Cache hit!

sumByOne(20); // Returns value returned by the function
sumByOne(20); // Cache hit!

// Custom cache
var sum = memoize(function(a, b) {
  return a + b;
}, function(a, b) {
  return `${a}-${b}`;
});

sum(10, 10); // Returns value returned by the function
sum(10, 20); // Returns value returned by the function
sum(10, 20); // Cache hit!
```
