## just-mean

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```js
import mean from 'just-mean';

mean([1, 2, 3, 2, 4, 1]); // 2.1666666667
mean(3, 2, 1); // 2
mean([4]); // 4
mean(['3', 2]); // throws
mean(); // throws
```
