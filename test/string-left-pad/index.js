var test = require('../util/test')(__filename);
var leftPad = require('../../packages/string-left-pad');

test('left pad with default pad character', function(t1) {
  test('strings with sufficient padding', function(t) {
    t.plan(2);
    t.equal(leftPad('hello', 9), '    hello');
    t.equal(leftPad('a', 2), ' a');
    t.end();
  });
  test('strings with insufficient padding', function(t) {
    t.plan(2);
    t.equal(leftPad('hello', 3), 'hello');
    t.equal(leftPad('a', 1), 'a');
    t.end();
  });
  test('strings with surrogate pairs', function(t) {
    t.plan(2);
    t.equal(leftPad('\uD83D\uDC04\uD83D\uDC04', 9), '       🐄🐄');
    t.equal(leftPad('\uD83D\uDC04\u00F6\u00F6\uD83D\uDC04', 9), '     🐄öö🐄');
    t.end();
  });
  t1.end();
  test('first argument must be a string', function(t) {
    t.plan(2);
    t.throws(function() {
      leftPad(['hello'], 8);
    });
    t.throws(function() {
      leftPad(27, 9);
    });
    t.end();
  });
});

test('left pad with custom pad character', function(t2) {
  test('strings with sufficient padding', function(t) {
    t.plan(2);
    t.equal(leftPad('hello', 9, '.'), '....hello');
    t.equal(leftPad('a', 2, '_'), '_a');
    t.end();
  });
  test('empty padding string treated as a space', function(t) {
    t.plan(1);
    t.equal(leftPad('no-pad', 12, ''), '      no-pad');
    t.end();
  });
  test('strings with insufficient padding', function(t) {
    t.plan(3);
    t.equal(leftPad('hello', 3, '.'), 'hello');
    t.equal(leftPad('a', 1, '_'), 'a');
    t.equal(leftPad('no-pad', 4, ''), 'no-pad');
    t.end();
  });
  test('surrogate pairs as pad chars', function(t) {
    t.plan(2);
    t.equal(leftPad('hello', 9, '\uD83D\uDC04'), '🐄🐄🐄🐄hello');
    t.equal(leftPad('hello', 6, '\uD83D\uDC11'), '🐑hello');
    t.end();
  });
  test('pad argument must be a strings', function(t) {
    t.plan(2);
    t.throws(function() {
      leftPad('hello', 9, false);
    });
    t.throws(function() {
      leftPad('hello', 12, 31);
    });
    t.end();
  });
  t2.end();
});

test('left pad with multiple custom pad characters', function(t3) {
  test('strings with sufficient padding', function(t) {
    t.plan(4);
    t.equal(leftPad('hello', 9, '..'), '....hello');
    t.equal(leftPad('hello', 8, '..'), '...hello');
    t.equal(leftPad('hello', 9, 'ab'), 'ababhello');
    t.equal(leftPad('hello', 8, 'ab'), 'babhello');
    t.end();
  });
  test('strings with insufficient padding', function(t) {
    t.plan(3);
    t.equal(leftPad('hello', 3, '..'), 'hello');
    t.equal(leftPad('a', 1, 'ab'), 'a');
    t.equal(leftPad('no-pad', 4, '**'), 'no-pad');
    t.end();
  });
  test('surrogate pairs as pad chars', function(t) {
    t.plan(2);
    t.equal(leftPad('hello', 9, '\uD83D\uDC11\uD83D\uDC04'), '🐑🐄🐑🐄hello');
    t.equal(leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), '🐄🐑🐄🐑🐄hello');
    t.end();
  });
  test("padding can't mix regular characters and surrogate pairs", function(t) {
    t.plan(1);
    t.throws(function() {
      leftPad('hello', 9, 'o0053\uD83D\uDC04');
    });
    t.end();
  });
  t3.end();
});
