module.exports = kebabCase;

/*
  kebabCase('the quick brown fox'); // 'the-quick-brown-fox'
  kebabCase('the-quick-brown-fox'); // 'the-quick-brown-fox'
  kebabCase('the_quick_brown_fox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrownFox'); // 'the-quick-brown-fox'
  kebabCase('theQuickBrown Fox'); // 'the-quick-brown-fox'
  kebabCase('thequickbrownfox'); // 'thequickbrownfox'
  kebabCase('the - quick * brown# fox'); // 'the-quick-brown-fox'
  kebabCase('theQUICKBrownFox'); // 'the-quick-brown-fox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var capitals_plus_lower = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]+[a-z]/g;
var capitals_plus_other = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]+[$|^a-zA-Z]/g;

function kebabCase(str) {
  //replace consecutive caps of caps with space + lower case equivalent for later parsing
  str = str.replace(capitals_plus_lower, function(match) {
    // match is consecutive caps followed by one non-cap
    console.log('***** match', match);
    var lastChar = match[match.length - 1];
    var lastCapLowered = match[match.length - 2].toLowerCase();
    var leadingChars = '';
    if (match.length > 2) {
      var leadingChars = ' ' + match.slice(0, match.length - 2).toLowerCase();
    }
    return leadingChars + ' ' + lastCapLowered + lastChar;
  });
  str = str.replace(capitals_plus_other, function(match) {
    return match.toLowerCase();
  });
  return str
    .trim()
    .split(wordSeparators)
    .join('-');
}
