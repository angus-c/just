var test = require('tape');
var snakeCase = require('../../packages/string-snake-case');

test('string with spaces', function (t) {
  t.plan(2);
  t.equal(snakeCase('the quick brown fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the quick     brownfox'), 'the_quick_brownfox');
  t.end();
});

test('string with punctuation', function (t) {
  t.plan(4);
  t.equal(snakeCase('the_quick_brown_fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the_quick_brown_fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the*quick-brown_fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the****quick-_-brown_:fox'), 'the_quick_brown_fox');
  t.end();
});

test('string with mixed spaces and punctuation', function (t) {
  t.plan(2);
  t.equal(snakeCase('the_quick_brown_   fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the** **quick-_-brown_:fox'), 'the_quick_brown_fox');
  t.end();
});

test('string with capitalization', function (t) {
  t.plan(3);
  t.equal(snakeCase('theQuickBrownFox'), 'the_quick_brown_fox');
  t.equal(snakeCase('the QuickBrown Fox'), 'the_quick_brown_fox');
  t.equal(snakeCase('The quick brown FOX'), 'the_quick_brown_f_o_x');
  t.end();
});
