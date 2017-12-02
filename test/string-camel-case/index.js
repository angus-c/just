var test = require('../util/test')(__filename);
var camelCase = require('../../packages/string-camel-case');

test('string with spaces (no strict)', function(t) {
  t.plan(2);
  t.equal(camelCase('the quick brown fox'), 'theQuickBrownFox');
  t.equal(camelCase('the quick     brownfox'), 'theQuickBrownfox');
  t.end();
});

test('string with spaces (with strict)', function(t) {
  t.plan(2);
  t.equal(camelCase('the quick brown fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('the quick     brownfox', {strict: true}), 'theQuickBrownfox');
  t.end();
});

test('string with punctuation (no strict)', function(t) {
  t.plan(4);
  t.equal(camelCase('the_quick_brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the-quick-brown-fox'), 'theQuickBrownFox');
  t.equal(camelCase('the*quick-brown_fox'), 'theQuickBrownFox');
  t.equal(camelCase('the****quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with punctuation (with strict)', function(t) {
  t.plan(4);
  t.equal(camelCase('the_quick_brown_fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('the-quick-brown-fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('the*quick-brown_fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('the****quick-_-brown_:fox', {strict: true}), 'theQuickBrownFox');
  t.end();
});

test('string with mixed spaces and punctuation (no strict)', function(t) {
  t.plan(2);
  t.equal(camelCase('the_quick_brown_   fox'), 'theQuickBrownFox');
  t.equal(camelCase('the** **quick-_-brown_:fox'), 'theQuickBrownFox');
  t.end();
});

test('string with mixed spaces and punctuation (with strict)', function(t) {
  t.plan(2);
  t.equal(camelCase('the_quick_brown_   fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('the** **quick-_-brown_:fox', {strict: true}), 'theQuickBrownFox');
  t.end();
});

test('string with existing capitalization (no strict)', function(t) {
  t.plan(5);
  t.equal(camelCase('theQuickBrownFox'), 'theQuickBrownFox');
  t.equal(camelCase('the Quick Brown Fox'), 'theQuickBrownFox');
  t.equal(camelCase('The quick brown FOX'), 'TheQuickBrownFOX');
  t.equal(camelCase('behold theQuickBrownFox'), 'beholdTheQuickBrownFox');
  t.equal(camelCase('Behold theQuickBrownFox'), 'BeholdTheQuickBrownFox');
  t.end();
});

test('string with existing capitalization (with strict)', function(t) {
  t.plan(5);
  t.equal(camelCase('theQuickBrownFox', {strict: true}), 'thequickbrownfox');
  t.equal(camelCase('the Quick Brown Fox', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('The quick brown FOX', {strict: true}), 'theQuickBrownFox');
  t.equal(camelCase('behold theQuickBrownFox', {strict: true}), 'beholdThequickbrownfox');
  t.equal(camelCase('Behold theQuickBrownFox', {strict: true}), 'beholdThequickbrownfox');
  t.end();
});

