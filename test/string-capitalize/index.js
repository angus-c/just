var test = require('../util/test')(__filename);
var capitalize = require('../../packages/string-capitalize');

test('string lowercase', function(t) {
  t.plan(2);
  t.equal(capitalize('capitals'), 'Capitals');
  t.equal(capitalize('some string'), 'Some string');
  t.end();
});

test('lowercase remaining string', function(t) {
  t.plan(2);
  t.equal(capitalize('capiTALS'), 'Capitals');
  t.equal(capitalize('some String'), 'Some string');
  t.end();
});

test('string already capitalized', function(t) {
  t.plan(2);
  t.equal(capitalize('Capitals'), 'Capitals');
  t.equal(capitalize('ALLCAPS'), 'Allcaps');
  t.end();
});

test('non alpha chars', function(t) {
  t.plan(3);
  t.equal(capitalize('1two'), '1two');
  t.equal(capitalize('!important'), '!important');
  t.equal(capitalize(' spaces'), ' spaces');
  t.end();
});

test('empty string', function(t) {
  t.plan(1);
  t.equal(capitalize(''), '');
  t.end();
});

test('argument not a string', function(t) {
  t.plan(7);
  t.throws(function() {capitalize();});
  t.throws(function() {capitalize(null);});
  t.throws(function() {capitalize(95);});
  t.throws(function() {capitalize(true);});
  t.throws(function() {capitalize({});});
  t.throws(function() {capitalize([]);});
  t.throws(function() {capitalize(function() {});});
  t.end();
});
