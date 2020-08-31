## just-has

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-has)

```js
import has from 'just-has';

const obj = {a: {aa: {aaa: 2}}, b: 4};

has(obj, 'a.aa.aaa'); // true
has(obj, ['a', 'aa', 'aaa']); // true

has(obj, 'b.bb.bbb'); // false
has(obj, ['b', 'bb', 'bbb']); // false

has(obj.a, 'aa.aaa'); // true
has(obj.a, ['aa', 'aaa']); // true

has(obj.b, 'bb.bbb'); // false
has(obj.b, ['bb', 'bbb']); // false

has(null, 'a'); // false
has(undefined, ['a']); // false

const obj = {a: {}};
const sym = Symbol();
obj.a[sym] = 4;
has(obj.a, sym); // true
```
