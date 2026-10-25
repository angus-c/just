var test = require('../util/test')(__filename);
var template = require('../../packages/string-template');

test('variables replaced by simple data', function(t) {
  t.plan(1);
  var data = {a: 3, b: 4};
  var result = template('this is {{a}} and this is {{b}}', data);
  t.equal(result, 'this is 3 and this is 4');
  t.end();
});

test('ignores whitespace around variable paths', function(t) {
  var data = {count: 3, setting: {count: 4}, 'full name': 'Ada'};
  t.equal(template('{{ count }}', data), '3');
  t.equal(template('{{ setting.count }}', data), '4');
  t.equal(template('count: {{\tsetting.count\n}}', data), 'count: 4');
  t.equal(template('{{ full name }}', data), 'Ada');
  t.equal(template('{{ missing.value }}', data), '');
  t.end();
});

test('variable used more than once', function(t) {
  t.plan(1);
  var data = {a: 3, b: 4};
  var result = template(
    'this is {{a}} and so is {{a}} and this is {{b}}',
    data
  );
  t.equal(result, 'this is 3 and so is 3 and this is 4');
  t.end();
});

test('using nested variables', function(t) {
  t.plan(1);
  var data = {
    a: {
      aa: {
        aaa: 'apple',
        bbb: 'pear',
      },
      bb: 'orange',
    },
    b: 'plum',
  };
  var str =
    '2 {{a.aa.aaa}}s, a {{a.aa.bbb}}, 3 {{a.bb}}s and a {{b}}. Yes 1 {{a.aa.bbb}}.';
  var result = '2 apples, a pear, 3 oranges and a plum. Yes 1 pear.';
  t.equal(template(str, data), result);
  t.end();
});

test('overlapping variables resolve', function(t) {
  var str = 'the answer is {{a{{b}}hmmm}}';
  var data = {a: 3, 'a{{b': 4};
  t.equal(template(str, data), 'the answer is 4hmmm}}');
  t.end();
});

test('unresolved variables return empty strings', function(t) {
  var str = 'a {{a}}, b {{b}}, c {{c}}';
  var data = {a: 3, c: 4};
  t.equal(template(str, data), 'a 3, b , c 4');
  t.end();
});

test('unresolved nested variables return empty strings', function(t) {
  t.plan(1);
  var str =
    '2 {{a.aa.aaa}}s, a {{aa.bbb}}, 3 {{a.bb}}s and a {{b}}. Yes 1 {{a.bbb.a}}.';
  var data = {
    a: {
      aa: {
        aaa: 'apple',
        bbb: 'pear',
      },
      bb: 'orange',
    },
    b: 'plum',
  };
  var result = '2 apples, a , 3 oranges and a plum. Yes 1 .';
  t.equal(template(str, data), result);
  t.end();
});
