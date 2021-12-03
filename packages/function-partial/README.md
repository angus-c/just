## just-partial-it

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-partial-it)

```shell
npm install just-partial-it
```
```shell
yarn add just-partial-it
```

Return a partial function

```js
import partial from 'just-partial-it';

const cubedRoot = partial(Math.pow, _, 1/3);
cubedRoot(64); // 4

const getRoot = partial(Math.pow, 64);
getRoot(1/2); // 8
```
