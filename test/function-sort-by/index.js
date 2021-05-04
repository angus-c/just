var test = require('../util/test')(__filename);
var sortBy = require('../../packages/funtion-sort-by');

test('produces a new sorted array', function(t) {
  t.plan(2);

  var arr = [10, 1, 5, 20, 15, 35, 30, 6, 8];
  var copied = arr.slice();

  t.deepEqual(
    sortBy(arr),
    [1, 5, 6, 8, 10, 15, 20, 30, 35]
  );

  t.deepEqual(arr, copied);

  t.end();
});

test('sort array of objects using the key passed by parameter', function(t) {
  t.plan(3);

  var users = [
    {user: 'fabio', age: 34},
    {user: 'max', age: 29},
    {user: 'zacarias', age: 44},
    {user: 'robert', age: 28},
    {user: 'klaus', age: 38},
  ];

  var copied = users.slice();

  t.deepEqual(
    sortBy(users, 'age'),
    [
      {user: 'robert', age: 28},
      {user: 'max', age: 29},
      {user: 'fabio', age: 34},
      {user: 'klaus', age: 38},
      {user: 'zacarias', age: 44},
    ]
  );

  t.deepEqual(
    sortBy(users, 'user'),
    [
      {user: 'fabio', age: 34},
      {user: 'klaus', age: 38},
      {user: 'max', age: 29},
      {user: 'robert', age: 28},
      {user: 'zacarias', age: 44},
    ]
  );

  t.deepEqual(users, copied);

  t.end();
});

test.only('invalid', function(t) {
  t.plan(7);

  t.throws(function() {
    sortBy();
  });

  t.throws(function() {
    sortBy(null);
  });

  t.throws(function() {
    sortBy({});
  });

  t.throws(function() {
    sortBy([], 1);
  });

  t.throws(function() {
    sortBy([1, 2, 3, 0], {});
  });

  t.throws(function() {
    sortBy([1, 2, 3, 0], function() {});
  });

  t.throws(function() {
    sortBy([1, 2, 3, 0], ['a', 'z', 'b']);
  });

  t.end();
});
