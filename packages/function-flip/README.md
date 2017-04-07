## just-curry-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-flip)

```js
import flip from 'just-flip';

flip(console.log)(1, 2, 3) // 2, 1, 3

import map from 'just-map-object';
import curry from 'just-curry';

const numbers = {x: 5, y: 10};
const flippedMap = flip(map);
const double = curry(flippedMap, (_, number) => number * 2);
double(numbers) // {x: 10, y: 20];
```
