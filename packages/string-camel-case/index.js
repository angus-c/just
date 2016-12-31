module.exports = camelCase;

/*
  camelCase('the quick brown fox'); // 'theQuickBrownFox'
  camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
  camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
  camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
  camelCase('thequickbrownfox'); // 'thequickbrownfox'
  camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
  camelCase('theQUICKBrownFox'); // 'theQUICKBrownFox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

function camelCase(str) {
  var words = str.split(wordSeparators);
  var len = words.length;
  var mappedWords = new Array(len);
  for (var i = 0; i < len; i++) {
    var word = words[i];
    var firstLetter = word[0];
    if (i > 0) {
      firstLetter = firstLetter.toUpperCase();
    }
    mappedWords[i] = firstLetter + word.slice(1);
  }
  return mappedWords.join('');
}
