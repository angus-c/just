var test = require('../util/test')(__filename);
var cartesianProduct = require('../../packages/array-cartesian-product');

test('cartesian product', function(t) {
  t.plan(6);

  t.deepEqual(
    cartesianProduct([]),
    []
  );

  t.deepEqual(
    cartesianProduct([[]]),
    []
  );

  t.deepEqual(
    cartesianProduct([['a']]),
    ['a']
  );

  t.deepEqual(
    cartesianProduct([['a', 'b'], [1, 2]]),
    [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
  );

  t.deepEqual(
    cartesianProduct([[1, 2], ['a', 'b', 'c']]),
    [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]
  );

  t.deepEqual(
    cartesianProduct([['a', 'b'], [1, 2], [[], {}]]),
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
    cartesianProduct();
  });

  t.throws(function() {
    cartesianProduct(1);
  });

  t.throws(function() {
    cartesianProduct(null);
  });

  t.throws(function() {
    cartesianProduct('javascript');
  });

  t.end();
});
