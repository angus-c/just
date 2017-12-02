module.exports = camelCase;

/*
  camelCase('the quick brown fox'); // 'theQuickBrownFox'
  camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
  camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
  camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
  camelCase('behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
  camelCase('Behold theQuickBrownFox'); // 'BeholdTheQuickBrownFox'
  camelCase('thequickbrownfox'); // 'thequickbrownfox'
  camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
  camelCase('theQUICKBrownFox'); // 'theQUICKBrownFox'

  // strict lower cases anything not at the beginning of a word
  // and the very first letter
  camelCase('theQuickBrownFox', {strict: true}); // 'thequickbrownfox'
  camelCase('behold theQuickBrownFox', {strict: true}); // 'beholdThequickbrownfox'
  camelCase('Behold theQuickBrownFox', {strict: true}); // 'beholdThequickbrownfox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

function camelCase(str, options) {
  var words = str.split(wordSeparators);
  var len = words.length;
  var strict = options && options.strict;
  var mappedWords = new Array(len);
  for (var i = 0; i < len; i++) {
    var word = words[i];
    if (word === '') {
      continue;
    }
    var firstLetter = word[0];
    firstLetter =
      i > 0 ?
        firstLetter.toUpperCase() :
        strict ? firstLetter.toLowerCase() : firstLetter;
    mappedWords[i] = firstLetter + (strict ? word.slice(1).toLowerCase() : word.slice(1));
  }
  return mappedWords.join('');
}
