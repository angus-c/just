var test = require('../util/test')(__filename);
var clamp = require('../../packages/number-clamp');

/*
  var n = 5;
  clamp(1, n, 12); // 5
  clamp(12, n, 3); // 3
  clamp(8.2, n, 9,4); // 8.2
  clamp(0, n, 0); // 0
  
  var n = -2;
  clamp(1, n, 12); // 1
  clamp(-4, n, -7); // -4

  clamp(NaN, n, 8); // NaN
  clamp(3, n, NaN); // NaN  
  clamp(3, NaN, 8); // NaN    

  clamp(undefined, n, 8); // throws
  clamp(3, n, 'h'); // throws  
  clamp(12, false, 8); // throws   
*/

test('positive numbers are limited by range', function(t) {
  t.plan(4);
  var n = 5;
  t.equal(clamp(1, n, 12), 5);
  t.equal(clamp(3, n, 1), 3);
  t.equal(clamp(8.2, n, 9), 8.2);
  t.equal(clamp(0, n, 0), 0);
  t.end();
});

test('negative numbers are limited by range', function(t) {
  t.plan(2);
  var n = -5;
  t.equal(clamp(1, n, 12), 1);
  t.equal(clamp(-6.5, n, -8), -6.5);
  t.end();
});

test('Returns NaN if any argument is NaN', function(t) {
  t.plan(3);
  var n = 3;
  t.ok(Number.isNaN(clamp(NaN, n, 8)));
  t.ok(Number.isNaN(clamp(3, n, NaN)));
  t.ok(Number.isNaN(clamp(3, NaN, 8)));
  t.end();
});

test('Throws if any argument is not a number', function(t) {
  t.plan(3);
  var n = -4;
  t.throws(function() {
    clamp(undefined, n, 8);
  });
  t.throws(function() {
    clamp(3, n, 'h');
  });
  t.throws(function() {
    clamp(3, false, 8);
  });
  t.end();
});
