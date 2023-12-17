var test = require('../util/test')(__filename);
var pascalCase = require('../../packages/string-pascal-case');

test('string with spaces', function(t) {
  t.plan(2);
  t.equal(pascalCase('the quick brown fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the quick     brownfox'), 'TheQuickBrownfox');
  t.end();
});

test('string with punctuation', function(t) {
  t.plan(4);
  t.equal(pascalCase('the_quick_brown_fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the-quick-brown-fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the*quick-brown_fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the****quick-_-brown_:fox'), 'TheQuickBrownFox');
  t.end();
});

test('string with mixed spaces and punctuation', function(t) {
  t.plan(2);
  t.equal(pascalCase('the_quick_brown_   fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the** **quick-_-brown_:fox'), 'TheQuickBrownFox');
  t.end();
});

test('string with existing capitalization', function(t) {
  t.plan(3);
  t.equal(pascalCase('theQuickBrownFox'), 'TheQuickBrownFox');
  t.equal(pascalCase('the Quick Brown Fox'), 'TheQuickBrownFox');
  t.equal(pascalCase('The quick brown FOX'), 'TheQuickBrownFOX');
  t.end();
});
