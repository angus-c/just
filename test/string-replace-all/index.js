var test = require('../util/test')(__filename);
var replaceAll = require('../../packages/string-replace-all');

test('string with replacements', function(t) {
  t.plan(3);
  t.equal(replaceAll('hello, world', 'l', 'qq'), 'heqqqqo, worqqd');
  t.equal(replaceAll('hello, world', 'll', 'q'), 'heqo, world');
  t.equal(replaceAll('hello, world', 'l', ''), 'heo, word');
  t.end();
});

test('string with no replacements', function(t) {
  t.plan(3);
  t.equal(replaceAll('hello, world', '', 'q'), 'hello, world');
  t.equal(replaceAll('hello, world', null, 'q'), 'hello, world');
  t.equal(replaceAll('hello, world', 'l', null), 'hello, world');
  t.end();
});

test('string with null,', function(t) {
  t.plan(1);
  t.equal(replaceAll(null, 'l', 'q'), null);
  t.end();
});
