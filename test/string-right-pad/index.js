var test = require('../util/test')(__filename);
var rightPad = require('../../packages/string-right-pad');

test('right pad with default pad character', function (t1) {
  test('strings with sufficient padding', function (t) {
    t.plan(2);
    t.equal(rightPad('hello', 9), 'hello    ');
    t.equal(rightPad('a', 2), 'a ');
    t.end();
  });
  test('strings with insufficient padding', function (t) {
    t.plan(2);
    t.equal(rightPad('hello', 3), 'hello');
    t.equal(rightPad('a', 1), 'a');
    t.end();
  });
  test('non strings', function (t) {
    t.plan(3);
    t.equal(rightPad(['hello'], 9), 'hello    ');
    t.equal(rightPad(1 + 1, 2), '2 ');
    t.equal(rightPad(null, 6), 'null  ');
    t.end();
  });
  t1.end();
});

test('right pad with custom pad character', function (t2) {
  test('strings with sufficient padding', function (t) {
    t.plan(3);
    t.equal(rightPad('hello', 9, '.'), 'hello....');
    t.equal(rightPad('a', 2, '_'), 'a_');
    t.equal(rightPad('no-pad', 12, ''), 'no-pad');
    t.end();
  });
  test('strings with insufficient padding', function (t) {
    t.plan(3);
    t.equal(rightPad('hello', 3, '.'), 'hello');
    t.equal(rightPad('a', 1, '_'), 'a');
    t.equal(rightPad('no-pad', 4, ''), 'no-pad');
    t.end();
  });
  test('non strings', function (t) {
    t.plan(3);
    t.equal(rightPad(['hello'], 9, '='), 'hello====');
    t.equal(rightPad(1 + 1, 2, '+'), '2+');
    t.equal(rightPad(null, 6, '<'), 'null<<');
    t.end();
  });
  t2.end();
});
