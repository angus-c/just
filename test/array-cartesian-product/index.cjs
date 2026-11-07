var test = require('../util/test')(__filename);
var cartesianProduct = require('../../packages/array-cartesian-product');

test('cartesian product', function(t) {
  t.plan(8);

  t.deepEqual(
    cartesianProduct([]),
    []
  );

  t.deepEqual(
    cartesianProduct([[], []]),
    []
  );

  t.deepEqual(
    cartesianProduct([['a']]),
    [['a']]
  );

  t.deepEqual(
    cartesianProduct([['a', 'b']]),
    [['a'], ['b']]
  );

  t.deepEqual(
    cartesianProduct([['a', 'b'], [1, 2]]),
    [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
  );

  //adding a 0 element set causes the entire product to be empty.
  t.deepEqual(
    cartesianProduct([['a', 'b'], [1, 2], []]),
    []
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
  t.plan(5);

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

  t.throws(function() {
    cartesianProduct(['haslength', [1, 2]]);
  });

  t.end();
});

test('reject invalid sets after the first set', function(t) {
  var invalidSets = ['abc', '', {length: 0}, {0: 'x', length: 1}, null,
    undefined, 0, false, function() {}];
  t.plan(invalidSets.length * 3);
  for (var i = 0; i < invalidSets.length; i++) {
    var invalidSet = invalidSets[i];
    t.throws(function() {
      cartesianProduct([[1], invalidSet]);
    }, /set at index 1 must be an array/);
    t.throws(function() {
      cartesianProduct([[1], [2], invalidSet]);
    }, /set at index 2 must be an array/);
    t.throws(function() {
      cartesianProduct([[], invalidSet]);
    }, /set at index 1 must be an array/);
  }
  t.end();
});
