var test = require('../util/test')(__filename);
var shuffle = require('../../packages/array-shuffle');
var compare = require('../../packages/collection-compare');

test('returns elements, randomly sorted', function(t) {
  t.plan(3);
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var shuffled = shuffle(arr);
  t.equal(arr.length, shuffled.length);
  t.notOk(compare(arr, shuffled));
  t.ok(compare(arr.sort(), shuffled.sort()));
  t.end();
});

test('always returns duplicate when array has 0 or 1 elements', function(t) {
  t.plan(4);
  var arr = [1];
  var shuffled = shuffle(arr);
  t.ok(compare(arr, shuffled));
  var arr2 = [];
  var shuffled2 = shuffle(arr2);
  t.ok(compare(arr2, shuffled2));
  var shuffled3 = shuffle(arr, {shuffleAll: true});
  t.ok(compare(arr, shuffled3));
  var shuffled4 = shuffle(arr2, {shuffleAll: true});
  t.ok(compare(arr2, shuffled4));
  t.end();
});

test('all elements moved when shuffleAll is `true`', function(t) {
  var arr = [1, 2, 3, 4, 5];
  t.plan(3 + arr.length);
  var shuffled = shuffle(arr, {shuffleAll: true});
  t.equal(arr.length, shuffled.length);
  t.notOk(compare(arr, shuffled));
  arr.forEach((each, i) => {
    t.notEqual(each, shuffled[i]);
  });
  t.ok(compare(arr.sort(), shuffled.sort()));
  t.end();
});

test('non-array arguments throw', function(t) {
  t.plan(4);
  t.throws(function() {
    shuffle({});
  });
  t.throws(function() {
    shuffle(undefined);
  });
  t.throws(function() {
    shuffle(null);
  });
  t.throws(function() {
    shuffle();
  });
  t.end();
});
