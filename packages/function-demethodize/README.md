## just-demethodize

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-demethodize)

```js
import demethodize from 'just-demethodize';

const trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn); // ['hello', 'goodbye', 'hello again']
```
