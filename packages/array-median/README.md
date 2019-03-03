## just-median

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import median from 'just-median';

median([1, 2, 3, 4, 5]); // 5
median([3, -1, 2]); // 2
median([9, 14, 14, 200, 15]); // 14
median(1, 2, 4, 3); // 2.5
median(['3', 2, 1]); // throws
median(); // throws
```
