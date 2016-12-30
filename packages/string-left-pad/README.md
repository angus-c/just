## just-left-pad

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import leftPad from 'just-left-pad';

leftPad('hello', 9); // '    hello'
leftPad('hello', 3); 'hello'
leftPad('hello', 9, '.'); '....hello'
leftPad(['hello'], 7, '_'); '__hello'
leftPad(null, 7); '   null'
```
