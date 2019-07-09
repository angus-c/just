module.exports = camelCase;

// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
var wordSeparatorsRegEx = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

var basicCamelRegEx = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
var fourOrMoreConsecutiveCapsRegEx = /([A-Z\u00C0-\u00DC]{4,})/g;
var allCapsRegEx = /^[A-Z\u00C0-\u00DC]+$/;

function camelCase(str, options) {
  var words = str.split(wordSeparatorsRegEx);
  var len = words.length;
  var mappedWords = new Array(len);
  for (var i = 0; i < len; i++) {
    var word = words[i];
    if (word === '') {
      continue;
    }
    var isCamelCase = basicCamelRegEx.test(word) && !allCapsRegEx.test(word);
    if (isCamelCase) {
      word = word.replace(fourOrMoreConsecutiveCapsRegEx, function(match, p1, offset) {
        return deCap(match, word.length - offset - match.length == 0);
      });
    }
    var firstLetter = word[0];
    firstLetter = i > 0 ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
    mappedWords[i] = firstLetter + (!isCamelCase ? word.slice(1).toLowerCase() : word.slice(1));
  }
  return mappedWords.join('');
}

function deCap(match, endOfWord) {
  var arr = match.split('');
  var first = arr.shift().toUpperCase();
  var last = endOfWord ? arr.pop().toLowerCase() : arr.pop();
  return first + arr.join('').toLowerCase() + last;
}
