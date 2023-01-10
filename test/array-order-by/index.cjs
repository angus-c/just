var test = require('../util/test')(__filename);
var orderBy = require('../../packages/array-order-by');

test('produces a new sorted array', function(t) {
  t.plan(2);

  var arr = [10, 1, 5, 20, 15, 35, 30, 6, 8];

  var copied = arr.slice();

  t.deepEqual(orderBy(arr), [1, 5, 6, 8, 10, 15, 20, 30, 35]);

  t.deepEqual(arr, copied);

  t.end();
});

test('sort array of objects using array of keys passed by parameter', function(t) {
  t.plan(3);

  var users = [
    {user: 'fabio', age: 34},
    {user: 'max', age: 29},
    {user: 'zacarias', age: 44},
    {user: 'robert', age: 28},
    {user: 'klaus', age: 38},
  ];

  var copied = users.slice();

  t.deepEqual(orderBy(users, ['age']), [
    {user: 'robert', age: 28},
    {user: 'max', age: 29},
    {user: 'fabio', age: 34},
    {user: 'klaus', age: 38},
    {user: 'zacarias', age: 44},
  ]);

  t.deepEqual(orderBy(users, ['user']), [
    {user: 'fabio', age: 34},
    {user: 'klaus', age: 38},
    {user: 'max', age: 29},
    {user: 'robert', age: 28},
    {user: 'zacarias', age: 44},
  ]);

  t.deepEqual(users, copied);

  t.end();
});

test('sort array of objects using array of callback functions passed by parameter', function(t) {
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
    orderBy(users, [function(o) {
      return o.age;
    }]),
    [
      {user: 'robert', age: 28},
      {user: 'max', age: 29},
      {user: 'fabio', age: 34},
      {user: 'klaus', age: 38},
      {user: 'zacarias', age: 44},
    ]
  );

  t.deepEqual(
    orderBy(users, [function(o) {
      return o.user;
    }]),
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

test('sort array of objects using array of objects passed by parameter', function(t) {
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
    orderBy(users, [
      {
        field: function(o) {
          return o.age;
        },
        order: 'desc',
      },
    ]),
    [
      {user: 'zacarias', age: 44},
      {user: 'klaus', age: 38},
      {user: 'fabio', age: 34},
      {user: 'max', age: 29},
      {user: 'robert', age: 28},
    ]
  );

  t.deepEqual(
    orderBy(users, [{field: 'user', order: 'desc'}]),
    [
      {user: 'zacarias', age: 44},
      {user: 'robert', age: 28},
      {user: 'max', age: 29},
      {user: 'klaus', age: 38},
      {user: 'fabio', age: 34},
    ]
  );

  t.deepEqual(users, copied);

  t.end();
});

test('invalid', function(t) {
  t.plan(6);

  t.throws(function() {
    orderBy();
  });

  t.throws(function() {
    orderBy(null);
  });

  t.throws(function() {
    orderBy({});
  });

  t.throws(function() {
    orderBy([], []);
  });

  t.throws(function() {
    orderBy([], 1);
  });

  t.throws(function() {
    orderBy([1, 2, 3, 0], {});
  });

  t.end();
});
