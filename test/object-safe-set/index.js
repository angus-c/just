var test = require('tape');
var set = require('../../packages/object-safe-set');
var compare = require('../../packages/collection-compare');

test('sets existing property using dot-notation arg', function (t) {
  t.plan(4);
  var obj1 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj1, 'a.aa.aaa', 3), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 3}}}));
  var obj2 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj2, 'a.aa', {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});

test('sets existing property using array arg', function (t) {
  t.plan(4);
  var obj1 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj1, ['a', 'aa', 'aaa'], 3), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 3}}}));
  var obj2 = {a: {aa: {aaa: 2}}};
  t.isEqual(set(obj2, ['a', 'aa'], {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});

test('sets non-existant property using dot-notation arg', function (t) {
  t.plan(4);
  var obj1 = {};
  t.isEqual(set(obj1, 'a.aa.aaa', 4), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 4}}}));
  var obj2 = {};
  t.isEqual(set(obj2, 'a.aa', {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});

test('sets non-existant property using array arg', function (t) {
  t.plan(4);
  var obj1 = {};
  t.isEqual(set(obj1, ['a', 'aa', 'aaa'], 4), true);
  t.ok(compare(obj1, {a: {aa: {aaa: 4}}}));
  var obj2 = {};
  t.isEqual(set(obj2, ['a', 'aa'], {bbb: 7}), true);
  t.ok(compare(obj2, {a: {aa: {bbb: 7}}}));
  t.end();
});
