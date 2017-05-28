## just-debounce-it

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-debounce-it)

```js
import debounce from 'just-debounce-it';

const debouncedFunc = debounce(function () {
    console.log('Hello World');
}, 500);

for (const i = 0; i < 5; i++) { debouncedFunc(); } // 500ms later - Hello World
debounceFunc();
debounceFunc(); 
// 500ms later
// Hello World
```



