var test = require('tape');
var kebabCase = require('../../packages/string-kebab-case');

test('string with spaces', function (t) {
  t.plan(2);
  t.equal(kebabCase('the quick brown fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the quick     brownfox'), 'the-quick-brownfox');
  t.end();
});

test('string with punctuation', function (t) {
  t.plan(4);
  t.equal(kebabCase('the_quick_brown_fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the_quick_brown_fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the*quick-brown_fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the****quick-_-brown_:fox'), 'the-quick-brown-fox');
  t.end();
});

test('string with mixed spaces and punctuation', function (t) {
  t.plan(2);
  t.equal(kebabCase('the_quick_brown_   fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the** **quick-_-brown_:fox'), 'the-quick-brown-fox');
  t.end();
});

test('string with capitalization', function (t) {
  t.plan(3);
  t.equal(kebabCase('theQuickBrownFox'), 'the-quick-brown-fox');
  t.equal(kebabCase('the QuickBrown Fox'), 'the-quick-brown-fox');
  t.equal(kebabCase('The quick brown FOX'), 'the-quick-brown-f-o-x');
  t.end();
});
