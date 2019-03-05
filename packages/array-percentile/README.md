## just-percentile

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```js
import percentile from 'just-percentile';

percentile([1, 2, 3], 0); // 1
percentile([1, 2, 3], 50); // 2
percentile([1, 2, 3], 100); // 3

// See https://en.wikipedia.org/wiki/Percentile (linear interpolation method)
percentile([15, 20, 35, 40, 50], 5); // 15
percentile([15, 20, 35, 40, 50], 30); // 20
percentile([15, 20, 35, 40, 50], 40); // 27.5
percentile([15, 20, 35, 40, 50], 95); // 50

percentile(1, 2, 3, 50); // throws
percentile(['1', 2, 3], 50); // throws
percentile([], 50); // throws
```
