## just-pascal-case

Part of a [library](https://anguscroll.com/just) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

[`🍦 Try it`](https://anguscroll.com/just/just-pascal-case)

```shell
npm install just-pascal-case
```
```shell
yarn add just-pascal-case
```

Convert a string to pascal case

```js
  import pascalCase from 'just-pascal-case';

  pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
  pascalCase('the_quick_brown_fox'); // 'TheQuickBrownFox'
  pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
  pascalCase('theQuickBrownFox'); // 'TheQuickBrownFox'
  pascalCase('thequickbrownfox'); // 'Thequickbrownfox'
  pascalCase('the - quick * brown# fox'); // 'TheQuickBrownFox'
  pascalCase('theQUICKBrownFox'); // 'TheQUICKBrownFox'
```
