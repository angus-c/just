## just-left-pad

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import leftPad from 'just-left-pad';

leftPad('hello', 9); // '    hello'
leftPad('hello', 3); // 'hello'
leftPad('hello', 9, '.'); // '....hello'
leftPad('hello', 9, '..'); // '....hello'
leftPad('hello', 10, 'ab'); // 'bababhello'
leftPad('hello', 9, '\uD83D\uDC04'); // '🐄🐄🐄🐄hello'
leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // '🐄🐑🐄🐑🐄hello'
leftPad('hello', 7, '🐄'), // '🐄🐄hello'
leftPad(null, 7); // throws
leftPad([], 4, '*'); // throws
leftPad('hello', 4, true); // throws
leftPad('hello', -4, true); // throws  
leftPad('hello', 2.3, true); // throws    
```
