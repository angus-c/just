## just-camel-case

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
  import camelCase from 'just-camel-case';

  camelCase('the quick brown fox'); // 'theQuickBrownFox'
  camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
  camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
  camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
  camelCase('behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'  
  camelCase('Behold theQuickBrownFox'); // 'BeholdTheQuickBrownFox'    
  camelCase('thequickbrownfox'); // 'thequickbrownfox'
  camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
  camelCase('theQUICKBrownFox'); // 'theQUICKBrownFox'

  // `strict` lower cases anything not at the beginning of a word 
  // and the very first letter
  camelCase('theQuickBrownFox', {strict: true}); // 'thequickbrownfox'    
  camelCase('behold theQuickBrownFox', {strict: true}); // 'beholdThequickbrownfox'    
  camelCase('Behold theQUICKBrownFox', {strict: true}); // 'beholdThequickbrownfox' 
```
