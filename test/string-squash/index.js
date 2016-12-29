var test = require('tape');
var squash = require('../../packages/string-squash');

/*
  remove spaces, optionally remove escape sequences \b, \t, \n, \f, \r, \", \', and \\

  squash('the cat sat on the mat'); // thecatsatonthemat
  squash(' the cat sat on the mat '); // thecatsatonthemat
  squash(' the \'cat\'\n sat on the mat '); // the\'cat\'\nsatonthemat
  squash(' the \'cat\'\n sat on the mat ', true); // thecatsatonthemat
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
    t.plan(2);
    var str = ' the \'cat\'\n sat on the mat ';
    var result = squash(str);
    t.equal(result, 'the\'cat\'\n satonthemat');
    str = '\t\t\thello';
    result = squash(str);
    t.equal(result, '\t\t\thello');
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
    t.plan(2);
    var str = ' the \'cat\'\n sat on the mat ';
    var result = squash(str, true);
    t.equal(result, 'thecatsatonthemat');
    str = '\t\t\thello';
    result = squash(str, true);
    t.equal(result, 'hello');
    t.end();
  });
  t2.end();
});
