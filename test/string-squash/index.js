var test = require('../util/test')(__filename);
var squash = require('../../packages/string-squash');

/*
  remove spaces, optionally remove escape sequences \t, \n, \f, \r and \v

  squash('the cat sat on the mat'); // 'thecatsatonthemat'
  squash(' the cat sat on the mat '); // 'thecatsatonthemat'
  squash('\tthe cat\n sat \fon \vthe \rmat '); // '\tthecat\nsat\fon\vthe\rmat'
  squash(' the \'cat\'\n sat on the mat ', true); // 'thecatsatonthemat'
  squash(`the cat
sat on the mat`, true); // thecatsatonthemat
*/

test('without escapeSequence flag', function (t1) {
  test('strings with no spaces are unchanged', function (t) {
    t.plan(1);
    var str = 'thecatsatonthemat';
    var result = squash(str);
    t.equal(result, 'thecatsatonthemat');
    t.end();
  });

  test('spaces are removed', function (t) {
    t.plan(1);
    var str = 'the cat sat on the mat';
    var result = squash(str);
    t.equal(result, 'thecatsatonthemat');
    t.end();
  });

  test('escape sequences are not removed', function (t) {
    t.plan(1);
    var str = '\tthe cat\n sat \fon \vthe \rmat ';
    var result = squash(str);
    t.equal(result, '\tthecat\nsat\fon\vthe\rmat');
    t.end();
  });
  t1.end();
});

test('with escapeSequence flag', function (t2) {
  test('strings with no escape sequences are unchanged', function (t) {
    t.plan(1);
    var str = 'thecatsatonthemat';
    var result = squash(str, true);
    t.equal(result, 'thecatsatonthemat');
    t.end();
  });

  test('spaces are removed', function (t) {
    t.plan(1);
    var str = 'the cat sat on the mat';
    var result = squash(str, true);
    t.equal(result, 'thecatsatonthemat');
    t.end();
  });

  test('escape sequences are removed', function (t) {
    t.plan(1);
    var str = '\tthe cat\n sat \fon \vthe \rmat ';
    var result = squash(str, true);
    t.equal(result, 'thecatsatonthemat');
    t.end();
  });
  t2.end();
});
