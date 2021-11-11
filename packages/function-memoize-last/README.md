## just-memoize-last

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-memoize-last)

```shell
npm install just-memoize-last
```
```shell
yarn add just-memoize-last
```

A memoize implementation that only caches the most recent evaluation

```js
const memoizeLast = require('just-memoize-last')
const compare = require('just-compare')

const maxValue = memoizeLast(function(arr) {
  return Math.max(...arr)
}, function(a, b) {
  return compare(a, b)
});

maxValue([1,2,3]) // 3
maxValue([1,2,3]) // cache hit!
maxValue([1,3,4]) // 4
maxValue([1,2,3]) // 3
```
