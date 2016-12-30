var test = require('tape');
var leftPad = require('../../packages/string-left-pad');

test('left pad with default pad character', function (t1) {
  test('strings with sufficient padding', function (t) {
    t.plan(2);
    t.equal(leftPad('hello', 9), '    hello');
    t.equal(leftPad('a', 2), ' a');
    t.end();
  });
  test('strings with insufficient padding', function (t) {
    t.plan(2);
    t.equal(leftPad('hello', 3), 'hello');
    t.equal(leftPad('a', 1), 'a');
    t.end();
  });
  test('non strings', function (t) {
    t.plan(3);
    t.equal(leftPad(['hello'], 9), '    hello');
    t.equal(leftPad(1 + 1, 2), ' 2');
    t.equal(leftPad(null, 6), '  null');
    t.end();
  });
  t1.end();
});

test('left pad with custom pad character', function (t2) {
  test('strings with sufficient padding', function (t) {
    t.plan(3);
    t.equal(leftPad('hello', 9, '.'), '....hello');
    t.equal(leftPad('a', 2, '_'), '_a');
    t.equal(leftPad('no-pad', 12, ''), 'no-pad');
    t.end();
  });
  test('strings with insufficient padding', function (t) {
    t.plan(3);
    t.equal(leftPad('hello', 3, '.'), 'hello');
    t.equal(leftPad('a', 1, '_'), 'a');
    t.equal(leftPad('no-pad', 4, ''), 'no-pad');
    t.end();
  });
  test('non strings', function (t) {
    t.plan(3);
    t.equal(leftPad(['hello'], 9, '='), '====hello');
    t.equal(leftPad(1 + 1, 2, '+'), '+2');
    t.equal(leftPad(null, 6, '>'), '>>null');
    t.end();
  });
  t2.end();
});
