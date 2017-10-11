## just-clamp

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import clamp from 'just-clamp';

var n = 5;
clamp(1, n, 12); // 5
clamp(3, n, 1); // 3
clamp(8, n, 9); // 8
clamp(0, n, 0); // 0

var n = -5;
clamp(1, n, 12); // 1
clamp(-7, n, -8); // -7

clamp(NaN, n, 8); // NaN
clamp(3, n, NaN); // NaN  
clamp(3, NaN, 8); // NaN    

clamp(undefined, n, 8); // throws
clamp(3, n, 'h'); // throws  
clamp(3, false, 8); // throws 
```
