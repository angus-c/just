## just-function-curry

Part of a [library]('../../README.md') of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for the bloat conscious developer.

```js
import curry from 'just-function-curry';

function converter(ratio, input) {
  return (input*ratio).toFixed(1);
}
var milesToKm = curry(converter, 1.62);
milesToKm(35); // 56.7
milesToKm(10); // 16.2
```
