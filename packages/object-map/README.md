## just-map-object

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-map-object)

```shell
npm install just-map-object
```
```shell
yarn add just-map-object
```

Map an object, passing key and value to predicates

```js
import map from 'just-map-object';

// DEPRECATED: use just-map-values
map({a: 3, b: 5, c: 9}, (key, value) => value + 1); // {a: 4, b: 6, c: 10}
map({a: 3, b: 5, c: 9}, (key, value) => key); // {a: 'a', b: 'b', c: 'c'}
map({a: 3, b: 5, c: 9}, (key, value) => key + value); // {a: 'a3', b: 'b5', c: 'c9'}```
```
