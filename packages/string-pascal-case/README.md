## just-pascal-case

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
  import pascalCase from 'just-pascal-case';

  pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
  pascalCase('the_quick_brown_fox'); // 'TheQuickBrownFox'
  pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
  pascalCase('theQuickBrownFox'); // 'TheQuickBrownFox'
  pascalCase('thequickbrownfox'); // 'Thequickbrownfox'
  pascalCase('the - quick * brown# fox'); // 'TheQuickBrownFox'
  pascalCase('theQUICKBrownFox'); // 'TheQUICKBrownFox'
```
