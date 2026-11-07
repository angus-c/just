var test = require('../util/test')(__filename);
var camelCase = require('../../packages/string-camel-case');

test('string with spaces', function(t) {
  t.plan(2);
  t.equal(camelCase('the quick brown fox'), 'theQuickBrownFox');
  t.equal(camelCase('the quick     brownfox'), 'theQuickBrownfox');
  t.end();
});

test('string with punctuation', function(t) {
  t.plan(4);
  t.equal(camelCase('the_quick_brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the-quick-brown-fox'), 'theQuickBrownFox');
  t.equal(camelCase('the*quick-brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the****quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with mixed spaces and punctuation', function(t) {
  t.plan(2);
  t.equal(camelCase('the_quick_brown_   fox'), 'theQuickBrownFox');
  t.equal(camelCase('the** **quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with existing capitalization', function(t) {
  t.plan(13);
  t.equal(camelCase('theQuickBrownFox'), 'theQuickBrownFox');
  t.equal(camelCase('TheQuickBrownFox'), 'theQuickBrownFox');
  t.equal(camelCase('the Quick Brown Fox'), 'theQuickBrownFox');
  t.equal(camelCase('The quick brown FOX'), 'theQuickBrownFox');
  t.equal(camelCase('theQUICKBrownFox'), 'theQuickBrownFox');
  t.equal(camelCase('behold theQuickBrownFox'), 'beholdTheQuickBrownFox');
  // camel-case all-caps substrings if length >= 4
  t.equal(camelCase('Behold theQUickBrownFox'), 'beholdTheQUickBrownFox');
  t.equal(camelCase('Behold theQUIckBrownFox'), 'beholdTheQUIckBrownFox');
  t.equal(camelCase('Behold theQUICkBrownFox'), 'beholdTheQuiCkBrownFox');
  t.equal(camelCase('Behold theQUICKBrownFox'), 'beholdTheQuickBrownFox');
  t.equal(camelCase('Behold theQUICKBrownFOXES'), 'beholdTheQuickBrownFoxes');
  t.equal(camelCase('THE_QUICK_BROWN_FOX'), 'theQuickBrownFox');
  t.equal(camelCase('THE_QUICK/BROWN_FOX'), 'theQuickBrownFox');
  t.end();
});

test('leading separators do not capitalize the first word', function(t) {
  var inputs = [
    'the quick brown fox', 'TheQuickBrownFox', 'THE_QUICK_BROWN_FOX',
    'theQUICKBrownFOXES', 'a', '3 apples', 'Éclair au chocolat',
  ];
  var prefixes = [' ', '  ', '_', '--', '* /_', '\t\n', '\u2003', '\u2014', '\u2e00'];
  t.plan(inputs.length * prefixes.length);
  for (var i = 0; i < inputs.length; i++) {
    for (var j = 0; j < prefixes.length; j++) {
      t.equal(camelCase(prefixes[j] + inputs[i]), camelCase(inputs[i]));
    }
  }
  t.end();
});

test('empty and separator-only inputs remain empty', function(t) {
  var inputs = ['', ' ', '__--', '\t\n\u2003', '* /_\u2014\u2e00'];
  t.plan(inputs.length);
  for (var i = 0; i < inputs.length; i++) {
    t.equal(camelCase(inputs[i]), '');
  }
  t.end();
});
