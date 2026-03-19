var test = require('../util/test')(__filename);
var extend = require('../../packages/object-extend');

test('shallow extend merges properties', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend merges into new object', function(t) {
  t.plan(2);
  var src = {};
  t.deepEqual(extend(src, {a: 3, b: 5}, {a: 4, c: 8}), {a: 4, b: 5, c: 8});
  t.deepEqual(src, {a: 4, b: 5, c: 8});
  t.end();
});

test('shallow extend does not clone child objects', function(t) {
  t.plan(5);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(src2, {c: obj}), {a: 3, b: 5, c: {p: 4}});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 9}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  t.deepEqual(extend(src1, {c: arrOuter}), {a: 3, b: 5, c: ['a', 'b', [1, 2, 3]]});
  t.equal(arrOuter, src1.c);
  t.equal(arrInner, src1.c[2]);
  t.end();
});

test('shallow extend copies non-plain objects', function(t) {
  t.plan(12);
  var fn = function(a, b) {
    return a + b;
  };
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(src2, {c: fn}), {a: 3, b: 5, c: fn});
  t.deepEqual(src2, {a: 3, b: 5, c: fn});
  t.equal(src2.c(4, 2), 6);
  fn.x = 34;
  t.equal(src2.c.x, 34);

  var date = new Date(1510439803151);
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(src3, {c: date}), {a: 3, b: 5, c: date});
  t.deepEqual(src3, {a: 3, b: 5, c: date});
  t.equal(src3.c.getTime(), 1510439803151);
  date.x = 34;
  t.equal(src3.c.x, 34);

  var regex = /abc/;
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(src3, {c: regex}), {a: 3, b: 5, c: regex});
  t.deepEqual(src3, {a: 3, b: 5, c: regex});
  t.equal(src3.c.exec('ddabc').index, 2);
  regex.x = 34;
  t.equal(src3.c.x, 34);

  t.end();
});

test('shallow extend works with null prototype extender', function(t) {
  t.plan(2);
  var src = {x: 4};
  var obj = Object.create(null);
  obj.x = 54;
  obj.y = {a: 3};
  t.deepEqual(extend(src, obj), {x: 54, y: {a: 3}});
  t.deepEqual(src, {x: 54, y: {a: 3}});
  t.end();
});

test('shallow extend works with null prototype target', function(t) {
  t.plan(2);
  var src = Object.create(null);;
  src.x = 54;
  src.y = {a: 3};
  var obj = {x: 92, y: {b: 8}};
  t.deepEqual(extend(src, obj), {x: 92, y: {b: 8}});
  t.deepEqual(src, {x: 92, y: {b: 8}});
  t.end();
});

test('deep extend merges child objects', function(t) {
  t.plan(2);
  var obj = {a: {b: 'c'}};
  var obj2 = {a: {c: 'd'}};
  t.deepEqual(extend(true, obj, obj2), {a: {b: 'c', c: 'd'}});
  t.deepEqual(obj, {a: {b: 'c', c: 'd'}});
  t.end();
});

test('deep extend clones child plain objects and arrays', function(t) {
  t.plan(5);
  var obj = {p: 4};
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(true, src2, {c: obj}), {a: 3, b: 5, c: {p: 4}});
  obj.p = 9;
  t.deepEqual(src2, {a: 3, b: 5, c: {p: 4}});

  var arrInner = [1, 2, 3];
  var arrOuter = ['a', 'b', arrInner];
  var src1 = {a: 3, b: 5};
  t.deepEqual(extend(true, src1, {c: arrOuter}), {a: 3, b: 5, c: ['a', 'b', [1, 2, 3]]});
  t.notEqual(arrOuter, src1.c);
  t.notEqual(arrInner, src1.c[2]);
  t.end();
});

test('deep extend does not clone child non-plain objects', function(t) {
  t.plan(12);
  var fn = function(a, b) {
    return a + b;
  };
  var src2 = {a: 3, b: 5};
  t.deepEqual(extend(true, src2, {c: fn}), {a: 3, b: 5, c: fn});
  t.deepEqual(src2, {a: 3, b: 5, c: fn});
  t.equal(src2.c(4, 2), 6);
  fn.x = 34;
  t.equal(src2.c.x, 34);

  var date = new Date(1510439803151);
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(true, src3, {c: date}), {a: 3, b: 5, c: date});
  t.deepEqual(src3, {a: 3, b: 5, c: date});
  t.equal(src3.c.getTime(), 1510439803151);
  date.x = 34;
  t.equal(src3.c.x, 34);

  var regex = /abc/;
  var src3 = {a: 3, b: 5};
  t.deepEqual(extend(true, src3, {c: regex}), {a: 3, b: 5, c: regex});
  t.deepEqual(src3, {a: 3, b: 5, c: regex});
  t.equal(src3.c.exec('ddabc').index, 2);
  regex.x = 34;
  t.equal(src3.c.x, 34);

  t.end();
});

test('deep extend works with null prototype extender', function(t) {
  t.plan(3);
  var src = {x: 4, y: {c: 9}};
  var obj = Object.create(null);
  var obj2 = {a: 3};
  obj.x = 54;
  obj.y = obj2;
  t.deepEqual(extend(true, src, obj), {x: 54, y: {a: 3, c: 9}});
  t.deepEqual(src, {x: 54, y: {a: 3, c: 9}});
  obj2.a = 4;
  t.deepEqual(src, {x: 54, y: {a: 3, c: 9}});
  t.end();
});

test('deep extend works with null prototype target', function(t) {
  t.plan(2);
  var src = Object.create(null);;
  src.x = 54;
  src.y = {a: 3};
  var obj = {x: 92, y: {b: 8}};
  t.deepEqual(extend(true, src, obj), {x: 92, y: {a: 3, b: 8}});
  t.deepEqual(src, {x: 92, y: {a: 3, b: 8}});
  t.end();
});

test('null values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: null, c: null}), {a: null, b: 5, c: null});
  t.deepEqual(src, {a: null, b: 5, c: null});
  t.end();
});

test('explicitly undefined values are copied', function(t) {
  t.plan(2);
  var src = {a: 3, b: 5};
  t.deepEqual(extend(src, {a: undefined, c: undefined}), {a: undefined, b: 5, c: undefined});
  t.deepEqual(src, {a: undefined, b: 5, c: undefined});
  t.end();
});

test('when no extenders, extendee is returned unmutated', function(t) {
  t.plan(4);
  var src = {a: 3, b: 5};
  var srcRef = src;
  t.deepEqual(src, extend(src));
  t.equal(srcRef, src);
  t.deepEqual(src, extend(true, src));
  t.equal(srcRef, src);
  t.end();
});

test('extendee and extenders can be functions', function(t) {
  t.plan(4);
  var fn = function() {};
  var result = extend(fn, {a: 4});
  t.ok(typeof result == 'function');
  t.ok(result.a === 4);

  var src = {a: 3};
  var fn2 = function() {};
  t.deepEqual(extend(true, src, {b: fn2}), {a: 3, b: fn2});
  t.deepEqual(src, {a: 3, b: fn2});
  t.end();
});

test('extender can be any primitive', function(t) {
  t.plan(12);
  var src1 = {a: 4};
  t.deepEqual(extend(src1, null), {a: 4});
  t.deepEqual(src1, {a: 4});

  var src2 = {a: 3};
  t.deepEqual(extend(src2, undefined), {a: 3});
  t.deepEqual(src2, {a: 3});

  var src3 = {a: 4};
  t.deepEqual(extend(src3, 'hello'), {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});
  t.deepEqual(src3, {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});

  var src4 = {1: 9, a: 4};
  t.deepEqual(extend(src4, 'hello', 4), {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});
  t.deepEqual(src4, {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 4});

  var src5 = {a: 4};
  t.deepEqual(extend(src5, false), {a: 4});
  t.deepEqual(src5, {a: 4});

  var src6 = {a: 4};
  t.deepEqual(extend(src6, 3, true), {a: 4});
  t.deepEqual(src6, {a: 4});
  t.end();
});

test("extendee can't be a primitive", function(t) {
  t.plan(9);
  t.throws(function() {
    extend(null, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(undefined, {b: 4, c: 5});
  });
  t.throws(function() {
    extend('hello', {b: 4, c: 5});
  });
  t.throws(function() {
    extend(3, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, null, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(true, undefined, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(true, 'hello', {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, 3, {b: 4, c: 5});
  });
  t.throws(function() {
    extend(false, false, {b: 4, c: 5});
  });
  t.end();
});

test('shallow extend does not copy prototype values', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5};
  var obj2 = Object.create({c: 9, d: 4, e: 3});
  obj2.a = 4;
  obj2.e = 7;
  t.deepEqual(extend(obj1, obj2), {a: 4, b: 5, e: 7});
  t.deepEqual(obj1, {a: 4, b: 5, e: 7});
  t.end();
});

test('deep extend does not copy prototype values', function(t) {
  t.plan(2);
  var obj1 = {a: 3, b: 5};
  var obj2 = Object.create({c: 9, d: 4});
  obj2.a = 4;
  obj2.e = 7;
  var obj3 = Object.create({f: 4, x: 12, y: 33});
  obj3.f = 2;
  obj3.g = 88;
  obj2.h = obj3;
  t.deepEqual(extend(true, obj1, obj2), {
    a: 4,
    b: 5,
    e: 7,
    h: {f: 2, g: 88},
  });
  t.deepEqual(obj1, {a: 4, b: 5, e: 7, h: {f: 2, g: 88}});
  t.end();
});

test('deep extend blocks prototype pollution via __proto__', function(t) {
  t.plan(6);
  // Verify clean state before attack
  t.equal({}.polluted, undefined, 'Object.prototype clean before test');

  // Attempt prototype pollution via JSON.parse (creates true own __proto__ property)
  var malicious = JSON.parse('{"__proto__": {"polluted": "yes"}}');
  var result = extend(true, {}, malicious);

  // Verify Object.prototype was NOT polluted
  t.equal({}.polluted, undefined, 'Object.prototype not polluted');
  t.equal(Object.prototype.polluted, undefined, 'Object.prototype.polluted is undefined');

  // Verify __proto__ key was skipped entirely (not copied to result)
  t.equal(Object.prototype.hasOwnProperty.call(result, '__proto__'), false, '__proto__ key not copied');
  t.equal(result.polluted, undefined, 'result does not inherit polluted property');

  // Verify new objects are clean
  var newObj = {};
  t.equal(newObj.polluted, undefined, 'new objects not polluted');
  t.end();
});

test('deep extend blocks prototype pollution via constructor.prototype', function(t) {
  t.plan(5);
  // Verify clean state before attack
  t.equal({}.isAdmin, undefined, 'Object.prototype clean before test');

  // Attempt prototype pollution via constructor.prototype
  var attackObj = {constructor: {prototype: {isAdmin: true}}};
  var result = extend(true, {}, attackObj);

  // Verify Object.prototype was NOT polluted
  t.equal({}.isAdmin, undefined, 'Object.prototype not polluted');
  t.equal(Object.prototype.isAdmin, undefined, 'Object.prototype.isAdmin is undefined');

  // Verify constructor key was skipped
  t.equal(Object.prototype.hasOwnProperty.call(result, 'constructor'), false, 'constructor key not copied');

  // Verify Function.prototype.constructor was not modified
  t.ok(typeof {}.constructor === 'function', 'constructor is still a function');
  t.end();
});

test('shallow extend blocks prototype pollution', function(t) {
  t.plan(4);
  // Attempt prototype pollution in shallow mode
  var malicious = JSON.parse('{"__proto__": {"polluted": "shallow"}}');
  var result = extend({}, malicious);

  // Verify Object.prototype was NOT polluted
  t.equal({}.polluted, undefined, 'Object.prototype not polluted in shallow mode');
  t.equal(Object.prototype.hasOwnProperty.call(result, '__proto__'), false, '__proto__ key not copied');

  // Also test constructor
  var attackObj = {constructor: {evil: true}};
  var result2 = extend({}, attackObj);
  t.equal(Object.prototype.hasOwnProperty.call(result2, 'constructor'), false, 'constructor key not copied');
  t.ok(typeof {}.constructor === 'function', 'constructor is still a function');
  t.end();
});

test('extend still works normally for non-dangerous keys', function(t) {
  t.plan(6);
  // Ensure regular functionality is not broken
  var src = {a: 1, b: {c: 2}};
  var ext = {a: 10, b: {d: 3}, e: 'new'};

  // Shallow extend
  var shallow = extend({}, src, ext);
  t.deepEqual(shallow, {a: 10, b: {d: 3}, e: 'new'}, 'shallow extend works');

  // Deep extend
  var deep = extend(true, {}, src, ext);
  t.deepEqual(deep, {a: 10, b: {c: 2, d: 3}, e: 'new'}, 'deep extend works');

  // Test with various valid keys that should still work
  var objWithSpecialKeys = {
    proto: 'valid', // Note: 'proto' without underscores is valid
    _constructor: 'valid',
    prototypeName: 'valid'
  };
  var result = extend({}, objWithSpecialKeys);
  t.equal(result.proto, 'valid', 'proto (without underscores) works');
  t.equal(result._constructor, 'valid', '_constructor works');
  t.equal(result.prototypeName, 'valid', 'prototypeName works');

  // Nested objects with normal keys
  var nested = extend(true, {}, {level1: {level2: {level3: 'deep'}}});
  t.equal(nested.level1.level2.level3, 'deep', 'nested extend works');
  t.end();
});

test('deep extend extendees can be primitive values', function(t) {
  t.plan(2);
  var obj1 = {a: null, b: null, c: null};
  var obj2 = {a: {foo: 'str'}, b: {bar: 5}};
  var obj3 = extend(true, {}, obj1, obj2);
  t.deepEqual(obj3, {a: {foo: 'str'}, b: {bar: 5}, c: null});

  var obj1 = {a: 5, b: 'foo', c: null};
  var obj2 = {a: {foo: 'str'}, b: {bar: 5}};
  var obj3 = extend(true, {}, obj1, obj2);
  t.deepEqual(obj3, {a: {foo: 'str'}, b: {bar: 5}, c: null});
  t.end();
});
