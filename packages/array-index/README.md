## just-index

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-index)

```js
import index from 'just-index';

index([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');
// {first: {id: 'first', val: 1}, second: {id: 'second', val: 2}}
index([{id: 'first', val: 1}, null], 'id'); // {first: {id: 'first', val: 1}}
index([], 'id'); // {}
index([], null); // undefined
index({}, 'id'); // undefined
```
