// TODO:skip tests until we have ie/edge support

// var test = require('../util/test')(__filename);
// var isCircular = require('../../packages/object-is-circular');

// test('detects circular objects', function(t) {
//   t.plan(2);
//   var obj1 = {};
//   obj1.x = obj1;
//   t.ok(isCircular(obj1));

//   var obj2 = {};
//   obj2.x = {y: obj2};
//   t.ok(isCircular(obj2));
//   t.end();
// });

// test('detects circular arrays', function(t) {
//   t.plan(1);
//   var obj1 = [];
//   obj1.push(obj1);
//   t.ok(isCircular(obj1));
//   t.end();
// });

// test('detects non-circular objects', function(t) {
//   t.plan(2);
//   var obj1 = {};
//   obj1.x = {y: 4};
//   t.ok(!isCircular(obj1));

//   t.ok(!isCircular({}));
//   t.end();
// });

// test('detects non-circular arrays', function(t) {
//   t.plan(1);
//   var obj1 = [];
//   obj1.push([]);
//   t.ok(!isCircular(obj1));
//   t.end();
// });

// test('returns false for non-objects', function(t) {
//   t.plan(5);
//   t.ok(!isCircular(undefined));
//   t.ok(!isCircular(null));
//   t.ok(!isCircular('hi'));
//   t.ok(!isCircular(false));
//   t.ok(!isCircular(/a/));
//   t.end();
// });

// test('throws for functions', function(t) {
//   t.plan(1);
//   t.throws(function() {
//     isCircular(function() {});
//   });
//   t.end();
// });
