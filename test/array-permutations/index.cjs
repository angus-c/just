var test = require('../util/test')(__filename);
var permutations = require('../../packages/array-permutations');

test('array with all permutations', function(t) {
  t.plan(5);

  t.deepEqual(
    permutations(['javascript', 'typescript']),
    [['javascript', 'typescript'], ['typescript', 'javascript']]
  );

  t.deepEqual(
    permutations([1, 2, 3]),
    [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]
  );

  t.deepEqual(permutations([]), []);
  t.deepEqual(permutations([1]), [[1]]);

  t.deepEqual(permutations([[1], [2]]), [[[1], [2]], [[2], [1]]]);

  t.end();
});

test('invalid', function(t) {
  t.plan(4);

  t.throws(function() {
    permutations();
  });

  t.throws(function() {
    permutations(undefined);
  });

  t.throws(function() {
    permutations(1);
  });

  t.throws(function() {
    permutations('javascript', 'typescript');
  });

  t.end();
});
