## just-curry-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-flip)

```js
import flip from 'just-flip';
import map from 'just-map';

const flippedMap = flip(map);
const objects = [{node: 'x', node: 'y'}];
const getNodes = flippedMap(({node}) => node);
getNodes(objects) // ['x', 'y'];
```
