## just-replace-all

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
  import replaceAll from 'just-replace-all';

/*
  replaceAll('hello, world', 'l', 'q'); // 'heqqo, worqd'
  replaceAll('hello, world', 'l', 'qq'); // 'heqqqqo, worqqd'
  replaceAll('hello, world', 'll', 'q'); // 'heqo, world'
  replaceAll('hello, world', '', 'q'); // 'hello, world'
  replaceAll('hello, world', 'l', ''); // 'heo, word'
  replaceAll('hello, world', null, 'q'); // 'hello, world'
  replaceAll('hello, world', 'l'); // throw
  replaceAll('hello, world'); // throw
  replaceAll(); // throw
  replaceAll(null, 'l', 'q'); // throw
  replaceAll('hello, world', null, 'q'); // throw
  replaceAll('hello, world', 'l', null); // throw
*/
```
