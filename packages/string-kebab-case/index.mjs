var stringKebabCase = kebabCase;

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
var capital_plus_lower = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD][a-zà-ÿ]/g;
var capitals = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD]+/g;

function kebabCase(str) {
  // replace word starts with space + lower case equivalent for later parsing
  // 1) treat cap + lower as start of new word
  str = str.replace(capital_plus_lower, function(match) {
    // match is one caps followed by one non-cap
    return ' ' + (match[0].toLowerCase() || match[0]) + match[1];
  });
  // 2) treat all remaining capitals as words
  str = str.replace(capitals, function(match) {
    // match is a series of caps
    return ' ' + match.toLowerCase();
  });
  return str
    .trim()
    .split(wordSeparators)
    .join('-')
    .replace(/^-/, '')
    .replace(/-\s*$/, '');
}

export {stringKebabCase as default};
