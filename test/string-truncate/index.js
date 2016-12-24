var test = require('tape');
var truncate = require('../../packages/string-truncate');

/*
  truncate('when shall we three meet again', 9); // 'when s...'
  truncate('when shall we three meet again', 10, ' (etc)'); // 'when (etc)'
  truncate('when shall we', 15,); // 'when shall we'
  truncate('when shall we', 15, ' (more)'); // 'when shall we'
  truncate('when shall we', 10, ' (etc etc etc)'); // ' (etc etc etc)'
*/

test('string defaulted with default suffix', function (t) {
  t.plan(1);
  var str = 'when shall we three meet again';
  var result = truncate(str, 9);
  t.equal(result, 'when s...');
  t.end();
});

test('string defaulted with custom suffix', function (t) {
  t.plan(1);
  var str = 'when shall we three meet again';
  var result = truncate(str, 10, ' (etc)');
  t.equal(result, 'when (etc)');
  t.end();
});

test('string is shorter than truncation length', function (t) {
  t.plan(2);
  var str = 'when shall we';
  var result = truncate(str, 25);
  t.equal(result, 'when shall we');
  result = truncate(str, 20, ' (more)');
  t.equal(result, 'when shall we');
  t.end();
});

test('suffix is greater than or equal to truncation length', function (t) {
  t.plan(2);
  var str = 'when shall we three meet again';
  var result = truncate(str, 10, ' (etc etc etc)');
  t.equal(result, ' (etc etc etc)');
  result = truncate(str, 7, ' (more)');
  t.equal(result, ' (more)');
  t.end();
});
