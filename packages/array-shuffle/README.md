## just-shuffle

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-shuffle)

```shell
npm install just-shuffle
```
```shell
yarn add just-shuffle
```

Return the elements of an array in random order

```js
import shuffle from 'just-shuffle';

shuffle([1, 2, 3]); 
// array with original elements randomly sorted
shuffle([1, 2, 3], {shuffleAll: true}); 
// array with original elements randomly sorted and all in new postions
shuffle([]); // []
shuffle([1]); // [1]
shuffle(); // throws
shuffle(undefined); // throws
shuffle(null); // throws
shuffle({}); // throws
```
