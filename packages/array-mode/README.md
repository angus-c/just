## just-mode

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import mode from 'just-mode';

mode([1, 2, 3, 2]); // 2
mode(4, 4, 1, 4); // 4
mode(100, 100, 101, 101); // [100, 101]
mode(4, 3, 2, 1); // [1, 2, 3, 4]
mode(['1', 2, 2, 1, 2]); // throws
mode(null); // throws
```
