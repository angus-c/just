var test = require('../util/test.js')(__filename);
var isNumeric = require('../../packages/string-is-numeric');

test('detects invalid cases', function(t) {
  t.false(isNumeric(''));
  t.false(isNumeric('123.123.123'));
  t.false(isNumeric('abc'));
  t.false(isNumeric('1e-8.1'));
  t.false(isNumeric('1aa'));
  t.end();
});

test('detects valid cases', function(t) {
  t.true(isNumeric('123'));
  t.true(isNumeric('123.123'));
  t.true(isNumeric('1e8'));
  t.true(isNumeric('1e-8'));
  t.end();
});
