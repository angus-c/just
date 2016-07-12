## just-compose

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

```js
import compose from 'just-compose';

const sqRootBiggest = compose(Math.trunc, Math.sqrt, Math.max);
sqRootBiggest(10, 5); // 3
sqRootBiggest(7, 0, 16); // 4
```
