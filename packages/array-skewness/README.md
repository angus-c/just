## just-skewness

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```js
import skewness from "just-skewness";

// Using Pearson's second skewness coefficient
skewness(3, 2, 1); // 0
skewness([1, 2, 3, 2, 4, 1]); // 0.4276994613841504
skewness(1, 2, 3, 4, 5, -6); // -0.762000762001143
skewness([1, 2, 3, 4, 9]); // 0.7705935588815224
skewness([4]); // throws
skewness(["3", 2]); // throws
skewness(NaN, NaN); // throws
skewness(); // throws
```
