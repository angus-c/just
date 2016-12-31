var test = require('tape');
var camelCase = require('../../packages/string-camel-case');

test('string with spaces', function (t) {
  t.plan(2);
  t.equal(camelCase('the quick brown fox'), 'theQuickBrownFox');
  t.equal(camelCase('the quick     brownfox'), 'theQuickBrownfox');
  t.end();
});

test('string with punctuation', function (t) {
  t.plan(4);
  t.equal(camelCase('the_quick_brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the-quick-brown-fox'), 'theQuickBrownFox');
  t.equal(camelCase('the*quick-brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the****quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with mixed spaces and punctuation', function (t) {
  t.plan(2);
  t.equal(camelCase('the_quick_brown_   fox'), 'theQuickBrownFox');
  t.equal(camelCase('the** **quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with existing capitalization', function (t) {
  t.plan(3);
  t.equal(camelCase('theQuickBrownFox'), 'theQuickBrownFox');
  t.equal(camelCase('the Quick Brown Fox'), 'theQuickBrownFox');
  t.equal(camelCase('The quick brown FOX'), 'TheQuickBrownFOX');
  t.end();
});
