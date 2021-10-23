var test = require('../util/test')(__filename);
var truncate = require('../../packages/string-truncate');

test('string defaulted with default suffix', function(t) {
  t.plan(1);
  var str = 'when shall we three meet again';
  var result = truncate(str, 9);
  t.equal(result, 'when s...');
  t.end();
});

test('string defaulted with custom suffix', function(t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = truncate(str, 12, ' (etc)');
  t.equal(result, 'when s (etc)');
  result = truncate(str, 17, '');
  t.equal(result, 'when shall we thr');
  t.end();
});

test('string is shorter than truncation length', function(t) {
  t.plan(2);
  var str = 'when shall we';
  var result = truncate(str, 25);
  t.equal(result, 'when shall we');
  result = truncate(str, 20, ' (more)');
  t.equal(result, 'when shall we');
  t.end();
});

test('no length specified', function(t) {
  t.plan(1);
  var str = 'when shall we three meet again';
  var result = truncate(str);
  t.equal(result, 'when shall we three meet again');
  t.end();
});

test('suffix is greater than or equal to truncation length', function(t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = truncate(str, 10, ' (etc etc etc)');
  t.equal(result, ' (etc etc etc)');
  result = truncate(str, 7, ' (more)');
  t.equal(result, ' (more)');
  t.end();
});

test('suffix is greater than or equal to string length', function(t) {
  t.plan(2);
  var str = 'when shall';
  var result = truncate(str, 10, ' very long suffix');
  t.equal(result, 'when shall');
  result = truncate(str, 17, ' very long suffix');
  t.equal(result, 'when shall');
  t.end();
});
