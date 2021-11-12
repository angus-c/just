## just-split

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-split)

```shell
npm install just-split
```
```shell
yarn add just-split
```

Splits array into groups of n items each

```js
import split from 'just-split';

split([]); // []
split([1, 2, 3, 4, 5]); // [[1, 2, 3, 4, 5]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split([1, 2, 3, 4, 5, 6, 7, 8, 9], '3'); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
split(['a', 'b', 'c', 'd', 'e'], 2); // [['a', 'b'], ['c', 'd'], ['e']]
split([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
```
