## just-safe-get

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-safe-get)

```js
import get from 'just-safe-get';

const obj = {a: {aa: {aaa: 2}}, b: 4};

get(obj, 'a.aa.aaa'); // 2
get(obj, ['a', 'aa', 'aaa']); // 2

get(obj, 'b.bb.bbb'); // undefined
get(obj, ['b', 'bb', 'bbb']); // undefined

get(obj.a, 'aa.aaa'); // 2
get(obj.a, ['aa', 'aaa']); // 2

get(obj.b, 'bb.bbb'); // undefined
get(obj.b, ['bb', 'bbb']); // undefined

get(null, 'a') // null
get(undefined, 'a') //undefined

get(obj.b, 'bb.bbb', 5); // 5
get(obj.b, ['bb', 'bbb'], true); // true

get(null, 'a', 5) // 5
get(undefined, 'a', {a: 3}) // {a: 3}

const obj = {a: {}};
const sym = Symbol();
obj.a[sym] = 4;
get(obj.a, sym); // 4
```
