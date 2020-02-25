var test = require('../util/test')(__filename);
var replaceAll = require('../../packages/string-replace-all');

test('string with replacements', function(t) {
  t.plan(4);
  t.equal(replaceAll('hello, world', 'l', 'q'), 'heqqo, worqd');
  t.equal(replaceAll('hello, world', 'l', 'qq'), 'heqqqqo, worqqd');
  t.equal(replaceAll('hello, world', 'll', 'q'), 'heqo, world');
  t.equal(replaceAll('hello, world', 'l', ''), 'heo, word');
  t.end();
});

test('string with no replacements', function(t) {
  t.plan(1);
  t.equal(replaceAll('hello, world', '', 'q'), 'hello, world');
  t.end();
});

test('invalid arguments', function(t) {
  t.plan(6);
  t.throws(function() {
    replaceAll('hello, world', 'l');
  });
  t.throws(function() {
    replaceAll('hello, world');
  });
  t.throws(function() {
    replaceAll();
  });
  t.throws(function() {
    replaceAll(null, 'l', 'q');
  });
  t.throws(function() {
    replaceAll('hello, world', null, 'q');
  });
  t.throws(function() {
    replaceAll('hello, world', 'l', null);
  });
  t.end();
});
