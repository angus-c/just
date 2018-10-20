## just-camel-case

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
  import camelCase from 'just-camel-case';

  camelCase('the quick brown fox'); // 'theQuickBrownFox'
  camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
  camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
  camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
  camelCase('thequickbrownfox'); // 'thequickbrownfox'
  camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
  camelCase('behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
  camelCase('Behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
  // all caps words are camel-cased
  camelCase('The quick brown FOX'), 'theQuickBrownFox');
  // all caps substrings >= 4 chars are camel-cased
  camelCase('theQUickBrownFox'); // 'theQUickBrownFox'
  camelCase('theQUIckBrownFox'); // 'theQUIckBrownFox'
  camelCase('theQUICKBrownFox'); // 'theQuickBrownFox'
```
