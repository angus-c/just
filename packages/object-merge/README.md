## just-merge

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-merge)

Shallow assign. Like just-extend but without deep copy option.

```js
import merge from 'just-merge';

let obj = {a: 3, b: 5};
merge(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 4, b: 5, c: 8}

let obj = {a: 3, b: 5};
merge({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
obj; // {a: 3, b: 5}

let arr = [1, 2, 3];
let obj = {a: 3, b: 5};
merge(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
arr.push[4];
obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

merge({a: 4, b: 5}); // {a: 4, b: 5}
merge(3, {a: 4, b: 5}); // throws
merge({a: 4, b: 5}, 3); // throws
merge({a: 4, b: 5}, {b: 4, c: 5}, 'c'); // throws
```
