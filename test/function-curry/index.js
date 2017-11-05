var test = require('../util/test')(__filename);
var curry = require('../../packages/function-curry');

test('converts n-ary function to a sequence of nested unary functions', function(t) {
  t.plan(13);
  function addThree(x, y, z) {
    return x + y + z;
  }
  var curryAddThree = curry(addThree);
  t.equal(typeof curryAddThree(3), 'function');
  t.equal(typeof curryAddThree(3, 2), 'function');
  t.equal(typeof curryAddThree(3, 2, 5), 'number');
  t.equal(typeof curryAddThree(3)(5)(4), 'number');
  t.equal(curryAddThree(3, 2, 5), 10);
  t.equal(curryAddThree(3)(5)(4), 12);

  var addTwoTo2 = curry(addThree)(2);
  t.equal(typeof addTwoTo2(3), 'function');
  t.equal(typeof addTwoTo2(3)(6), 'number');
  t.equal(typeof addTwoTo2(3, 6), 'number');
  t.equal(addTwoTo2(5)(8), 15);
  t.equal(addTwoTo2(13, 21), 36);
  t.equal(curry(addThree)(34)(55)(89), 178);

  function converter(ratio, input) {
    return (input * ratio).toFixed(1);
  }
  var curriedConverter = curry(converter);
  var milesToKm = curriedConverter(1.62);
  t.equal(milesToKm(35), '56.7');
  t.end();
});

test('supports arity override argument', function(t) {
  t.plan(5);
  function add(/* infinite number args */) {
    var args = [].slice.call(arguments);
    return args.reduce(function(sum, n) {
      return sum + n;
    }, 0);
  }
  var curryAdd4 = curry(add, 4);
  t.equal(typeof curryAdd4(3), 'function');
  t.equal(typeof curryAdd4(3)(1, 4), 'function');
  t.equal(typeof curryAdd4(3)(1, 4)(2), 'number');
  t.equal(curryAdd4(5)(8)(2)(7), 22);
  t.equal(curryAdd4(5)(8, 4)(7), 24);
  t.end();
});

test('accepts arguments exceeding arity', function(t) {
  t.plan(2);
  function add(/* infinite number args */) {
    var args = [].slice.call(arguments);
    return args.reduce(function(sum, n) {
      return sum + n;
    }, 0);
  }
  var curryAdd4 = curry(add, 4);
  t.equal(typeof curryAdd4(3)(1, 4)(2, 5), 'number');
  t.equal(curryAdd4(3)(1, 4)(2, 5), 15);
  t.end();
});

test('does not bind supplied arguments', function(t) {
  t.plan(3);
  function converter(ratio, input) {
    return (input * ratio).toFixed(1);
  }
  var milesToKm = curry(converter, 1.62);
  t.equal(typeof milesToKm(35), 'function');
  t.equal(milesToKm(1.62)(10), '16.2');
  t.equal(milesToKm(1.62, 10), '16.2');
  t.end();
});

test('still returns a function for zero-arity functions', function(t) {
  t.plan(2);
  function nothing() {}
  t.equal(typeof curry(nothing), 'function');
  t.equal(typeof curry(nothing, 1, 2, 3), 'function');
});

test('executes in the correct context', function(t) {
  t.plan(2);
  function converter(ratio, input) {
    return (input * ratio).toFixed(this.dps);
  }
  var milesToKm = curry(converter)(1.62);
  t.equal(milesToKm.call({dps: 0}, 35), '57');
  t.equal(milesToKm.call({dps: 2}, 35), '56.70');
  t.end();
});
