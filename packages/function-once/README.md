## just-once

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-once)

```js
import once from 'just-once';

const fn = once(() => console.log('hello'));

fn();
// logs 'hello'
fn();
// does nothing
```
