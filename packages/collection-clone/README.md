## just-clone

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-clone)

```shell
npm install just-clone
```
```shell
yarn add just-clone
```

Deep copies objects and arrays

```js
// Deep copies objects and arrays, doesn't clone functions

import clone from 'just-clone';

var arr = [1, 2, 3];
var subObj = { aa: 1 };
var obj = { a: 3, b: 5, c: arr, d: subObj };
var objClone = clone(obj);
arr.push(4);
objClone.d.bb = 2;
obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
```
