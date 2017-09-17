module.exports = kebabCase;

/*
  kebabCase('the quick brown fox'); // 'the-quick-brown-fox'
  kebabCase('the-quick-brown-fox'); // 'the-quick-brown-fox'
  kebabCase('the_quick_brown_fox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrownFox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrown Fox'); // 'the-quick-brown-fox'
  kebabCase('thequickbrownfox'); // 'thequickbrownfox'
  kebabCase('the - quick * brown# fox'); // 'the-quick-brown-fox'
  kebabCase('theQUICKBrownFox'); // 'the-q-u-i-c-k-brown-fox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;

function kebabCase(str) {
  //replace capitals with space + lower case equivalent for later parsing
  str = str.replace(capitals, function(match) {
    return ' ' + (match.toLowerCase() || match);
  });
  return str
    .trim()
    .split(wordSeparators)
    .join('-');
}
