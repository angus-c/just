var test = require('../util/test')(__filename);
var typeOf = require('../../packages/object-typeof');

test('all types', function(t) {
  t.equal(typeOf({}), 'object');
  t.equal(typeOf([]), 'array');
  t.equal(typeOf(new Array()), 'array');
  t.equal(typeOf(function() {}), 'function');
  t.equal(typeOf(async function() {}), 'function');
  t.equal(typeOf(function* () {}), 'function');
  t.equal(typeOf(new Function()), 'function');
  t.equal(typeOf(/a/), 'regexp');
  t.equal(typeOf(new Date()), 'date');
  t.equal(typeOf(null), 'null');
  t.equal(typeOf(undefined), 'undefined');
  t.equal(typeOf('a'), 'string');
  t.equal(typeOf(3), 'number');
  t.equal(typeOf(true), 'boolean');
  t.end();
});
