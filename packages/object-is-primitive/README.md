## just-is-primitive

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.  
Guilt-free utilities for every occasion.

[Try it now](http://anguscroll.com/just/just-is-primitive)

```js
import isPrimitive from 'just-is-primitive';
isPrimitive('hi') // true
isPrimitive(3) // true
isPrimitive(true) // true
isPrimitive(false) // true
isPrimitive(null) // true
isPrimitive(undefined) // true
isPrimitive(Symbol()) // true
isPrimitive({}) // false
isPrimitive([]) // false
isPrimitive(function() {}) // false
isPrimitive(new Date()) // false
isPrimitive(/a/) // false
```
