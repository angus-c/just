## just-throttle

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-throttle)

```js
import throttle from 'just-throttle';

const fn1 = throttle(() => console.log('hello'), 500, {leading: true});
setInterval(fn1, 400);
// logs 'hello' immediately and then every 500ms

const fn2 = throttle(() => console.log('hello'), 500, {trailing: true});
setInterval(fn2, 400);
// logs 'hello' after 500ms and then every 500ms

const fn2 = throttle(() => console.log('hello'), 500, {leading: true, trailing: true});
// forces trailing to false
```
