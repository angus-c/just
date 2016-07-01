var test = require('tape');
var compare = require('../../object-compare');

test('like arrays return true', function (t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3, 4];
  t.ok(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 4], 5];
  t.ok(compare(value3, value4));
  t.end();
});

test('unlike arrays return false', function (t) {
  t.plan(2);
  var value1 = [1, 2, 3, 4];
  var value2 = [1, 2, 3];
  t.notOk(compare(value1, value2));
  var value3 = [1, 2, [3, 4], 5];
  var value4 = [1, 2, [3, 3], 5];
  t.notOk(compare(value3, value4));
  t.end();
});

// TO BE CONTINUED....
