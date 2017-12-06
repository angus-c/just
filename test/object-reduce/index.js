var test = require('../util/test')(__filename);
var reduce = require('../../packages/object-reduce');
var compare = require('../../packages/collection-compare');

var noop = function() {};
noop.toString = function() {
  return 'noop function';
};
var obj = {a: 3, b: 5, c: 9, d: null, e: noop};

test('initialValue', function(t) {
  t.plan(2);

  var expectedKeys = Object.keys(obj);

  function getArgsInitialIndex(idx) {
    return function() {
      if (arguments[3] == idx) {
        return [].slice.call(arguments);
      }
      return arguments[0];
    };
  }

  // Without initialValue
  var result1 = reduce(obj, getArgsInitialIndex(1));
  t.ok(compare(result1, [3, 'b', 5, 1, expectedKeys]));

  // With initialValue
  var result2 = reduce(obj, getArgsInitialIndex(0), []);
  t.ok(compare(result2, [[], 'a', 3, 0, expectedKeys]));
  t.end();
});

test('use value', function(t) {
  t.plan(3);

  var result1 = reduce(
    obj,
    function(target, key, value) {
      target.push(value);
      return target;
    },
    []
  );
  t.ok(compare(result1, [3, 5, 9, null, noop]));

  var result2 = reduce(
    obj,
    function(target, key, value) {
      target += Number(value) || 0;
      return target;
    },
    0
  );
  t.ok(compare(result2, 17));

  var result3 = reduce(obj, function(target, key, value) {
    target += Number(value) || 0;
    return target;
  });
  t.ok(compare(result3, 17));
  t.end();
});

test('use key', function(t) {
  t.plan(3);

  var result1 = reduce(
    obj,
    function(target, key, value) {
      target.push(key);
      return target;
    },
    []
  );
  t.ok(compare(result1, ['a', 'b', 'c', 'd', 'e']));

  var result2 = reduce(
    obj,
    function(target, key, value, index) {
      target[index] = key;
      return target;
    },
    {}
  );
  t.ok(compare(result2, {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e'}));

  var result3 = reduce(obj, function(target, key, value) {
    target += key;
    return target;
  });
  t.ok(compare(result3, '3bcde'));
  t.end();
});

test('use key and value', function(t) {
  t.plan(2);

  var expectedResult1 = ['a is 3', 'b is 5', 'c is 9', 'd is null', 'e is noop function'];
  var result1 = reduce(
    obj,
    function(target, key, value) {
      target.push(key + ' is ' + value);
      return target;
    },
    []
  );

  t.ok(compare(result1, expectedResult1));

  var result2 = reduce(
    obj,
    function(target, key, value) {
      target[value] = key;
      return target;
    },
    {}
  );
  t.ok(
    compare(result2, {
      3: 'a',
      5: 'b',
      9: 'c',
      null: 'd',
      'noop function': 'e',
    })
  );
  t.end();
});

test('invalid usage', function(t) {
  t.plan(2);

  t.throws(function() {
    reduce(obj);
  });

  t.throws(function() {
    reduce({}, noop);
  });
  t.end();
});
