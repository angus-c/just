/* globals Symbol */

var test = require('../util/test')(__filename);
var isPrimitive = require('../../packages/object-is-primitive');

/*
isPrimitive('hi') // true
isPrimitive(3) // true
isPrimitive(true) // true
isPrimitive(false) // true
isPrimitive(null) // true
isPrimitive(undefined) // true
isPrimitive(Symbol()) // true
isPrimitive({}) // false
isPrimitive([]) // false
isPrimitive(function() {}) // false
isPrimitive(new Date()) // false
isPrimitive(/a/) // false
*/

test('detects primitive values', function(t) {
  t.plan(7);
  t.ok(isPrimitive('hi'));
  t.ok(isPrimitive(3));
  t.ok(isPrimitive(true));
  t.ok(isPrimitive(false));
  t.ok(isPrimitive(null));
  t.ok(isPrimitive(undefined));
  if (typeof Symbol == 'function') {
    t.ok(isPrimitive(Symbol()));
  } else {
    t.ok(true, 'symbols not supported in this browser');
  }
  t.end();
});

test('detects non-primitive values', function(t) {
  t.plan(5);
  t.ok(!isPrimitive({}));
  t.ok(!isPrimitive([]));
  t.ok(!isPrimitive(function() {}));
  t.ok(!isPrimitive(new Date()));
  t.ok(!isPrimitive(/a/));
  t.end();
});
