## just-demethodize

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-demethodize)

```shell
npm install just-demethodize
```
```shell
yarn add just-demethodize
```

Turn a method into a standalone function; the first arg becomes `this`

```js
import demethodize from 'just-demethodize';

const trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn); // ['hello', 'goodbye', 'hello again']
```
