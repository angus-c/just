## just-permutations

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-permutations)

```shell
npm install just-permutations
```
```shell
yarn add just-permutations
```

Returns all permutations of the length N of the elements of the given Array

```js
import permutations from 'just-array-permutations;

permutations([1, 2, 3]); // [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]
permutations([]); // []
permutations(); // throws
```
