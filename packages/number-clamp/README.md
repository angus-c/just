## just-clamp

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import clamp from 'just-clamp';

var n = 5;
clamp(1, n, 12); // 5
clamp(1, n, 3); // 3
clamp(8, n, 9); // 8
clamp(0, n, 0); // 0
n = undefined;
clamp(3, n, 8); // 3
n = null;
clamp(3, n, 8); // 3
n = NaN;
clamp(3, n, 8); // 3
```
