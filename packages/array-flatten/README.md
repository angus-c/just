## just-flatten-it

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-flatten-it)

```shell
npm install just-flatten-it
```
```shell
yarn add just-flatten-it
```

Return a flattened array

```js
import flatten from 'just-flatten-it';

flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]], 1);
// [1, [2, 3], [[4, 5], 6, 7, [8, 9]]]
```
