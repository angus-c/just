var stringPascalCase = pascalCase;

/*
  pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
  pascalCase('the_quick_brown_fox'); // 'TheQuickBrownFox'
  pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
  pascalCase('theQuickBrownFox'); // 'TheQuickBrownFox'
  pascalCase('thequickbrownfox'); // 'Thequickbrownfox'
  pascalCase('the - quick * brown# fox'); // 'TheQuickBrownFox'
  pascalCase('theQUICKBrownFox'); // 'TheQUICKBrownFox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

function pascalCase(str) {
  var words = str.split(wordSeparators);
  var len = words.length;
  var mappedWords = new Array(len);
  for (var i = 0; i < len; i++) {
    var word = words[i];
    if (word === '') {
      continue;
    }
    mappedWords[i] = word[0].toUpperCase() + word.slice(1);
  }
  return mappedWords.join('');
}

export {stringPascalCase as default};
