var test = require('../util/test')(__filename);
var deepOmit = require('../../../packages/object-deep-omit/index.cjs');
var compare = require('../../../packages/collection-compare/index.cjs');

test('omits deep existing object property using dot-notation arg', function(t) {
  t.plan(2);
  var obj1 = {a: {aa: {aaa: 2, bbb: 3}}};
  t.isEqual(deepOmit(obj1, 'a.aa.aaa'), true);
  t.ok(compare(obj1, {a: {aa: {bbb: 3}}}));
  t.end();
});

test('omit deep existing object property using array arg', function(t) {
  t.plan(2);
  var obj1 = {a: {aa: {aaa: 2, bbb: 3}}};
  t.isEqual(deepOmit(obj1, ['a', 'aa', 'aaa']), true);
  t.ok(compare(obj1, {a: {aa: {bbb: 3}}}));
  t.end();
});

test('omits deep existing array item using dot-notation arg', function(t) {
  t.plan(2);
  var obj1 = {a: {aa: [1, 2, 3]}};
  t.isEqual(deepOmit(obj1, 'a.aa.1'), true);
  t.ok(compare(obj1, {a: {aa: [1, 3]}}));
  t.end();
});

test('omit deep existing array items using array arg', function(t) {
  t.plan(2);
  var obj1 = {a: {aa: [1, 2, 3]}};
  t.isEqual(deepOmit(obj1, ['a', 'aa', '1']), true);
  t.ok(compare(obj1, {a: {aa: [1, 3]}}));
  t.end();
});

test('ignores non-existent keys', function(t) {
  t.plan(2);
  var obj1 = {a: {aa: [1, 2, 3]}};
  t.isEqual(deepOmit(obj1, 'a.bb'), true);
  t.ok(compare(obj1, {a: {aa: [1, 2, 3]}}));
  t.end();
});
