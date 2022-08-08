module.exports = snakeCase;

/*
  snakeCase('the quick brown fox'); // 'the_quick_brown_fox'
  snakeCase('the-quick-brown-fox'); // 'the_quick_brown_fox'
  snakeCase('the_quick_brown_fox'); // 'the_quick_brown_fox'
  snakeCase('theQuickBrownFox'); // 'the_quick_brown_fox'
  snakeCase('theQuickBrown Fox'); // 'the_quick_brown_Fox'
  snakeCase('thequickbrownfox'); // 'thequickbrownfox'
  snakeCase('the - quick * brown# fox'); // 'the_quick_brown_fox'
  snakeCase('theQUICKBrownFox'); // 'the_q_u_i_c_k_brown_fox'
*/

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;

function snakeCase(str) {
  //replace capitals with space + lower case equivalent for later parsing
  str = str.replace(capitals, function(match) {
    return ' ' + (match.toLowerCase() || match);
  });
  return str
    .trim()
    .split(wordSeparators)
    .join('_');
}
