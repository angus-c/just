## just-right-pad

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import rightPad from 'just-right-pad';

rightPad('hello', 9); // 'hello    '
rightPad('hello', 3); 'hello'
rightPad('hello', 9, '.'); 'hello....'
rightPad(['hello'], 7, '_'); 'hello__'
rightPad(null, 7); 'null   '
```
