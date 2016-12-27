var test = require('tape');
var prune = require('../../packages/string-prune');

test('string defaulted with default suffix', function (t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = prune(str, 9);
  t.equal(result, 'when...');
  result = prune(str, 13);
  t.equal(result, 'when shall...');
  t.end();
});

test('string defaulted with custom suffix', function (t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = prune(str, 16, ' (etc)');
  t.equal(result, 'when shall (etc)');
  result = prune(str, 16, '');
  t.equal(result, 'when shall we');
  t.end();
});

test('no length specified', function (t) {
  t.plan(1);
  var str = 'when shall we three meet again';
  var result = prune(str);
  t.equal(result, 'when shall we three meet again');
  t.end();
});

test('string is shorter than truncation length', function (t) {
  t.plan(2);
  var str = 'when shall we';
  var result = prune(str, 25);
  t.equal(result, 'when shall we');
  result = prune(str, 20, ' (more)');
  t.equal(result, 'when shall we');
  t.end();
});

test('suffix is greater than or equal to truncation length', function (t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = prune(str, 10, ' (etc etc etc)');
  t.equal(result, ' (etc etc etc)');
  result = prune(str, 7, ' (more)');
  t.equal(result, ' (more)');
  t.end();
});

test('suffix is greater than or equal to string length', function (t) {
  t.plan(2);
  var str = 'when shall';
  var result = prune(str, 10, ' very long suffix');
  t.equal(result, 'when shall');
  result = prune(str, 17, ' very long suffix');
  t.equal(result, 'when shall');
  t.end();
});
