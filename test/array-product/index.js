var test = require('../util/test')(__filename);
var product = require('../../packages/array-product');

test('products', function(t) {
  t.plan(6);

  t.deepEqual(
    product([]),
    []
  );

  t.deepEqual(
    product([[]]),
    []
  );

  t.deepEqual(
    product([['a']]),
    ['a']
  );

  t.deepEqual(
    product([['a', 'b'], [1, 2]]),
    [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
  );

  t.deepEqual(
    product([[1, 2], ['a', 'b', 'c']]),
    [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]
  );

  t.deepEqual(
    product([['a', 'b'], [1, 2], [[], {}]]),
    [
      ['a', 1, []], ['a', 1, {}], ['a', 2, []], ['a', 2, {}],
      ['b', 1, []], ['b', 1, {}], ['b', 2, []], ['b', 2, {}],
    ]
  );

  t.end();
});

test('invalid', function(t) {
  t.plan(4);

  t.throws(function() {
    product();
  });

  t.throws(function() {
    product(1);
  });

  t.throws(function() {
    product(null);
  });

  t.throws(function() {
    product('javascript');
  });

  t.end();
});
