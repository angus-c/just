var test = require('../util/test')(__filename);
var random = require('../../packages/number-random-integer');

var nativeRandomFn = Math.random;
function mockRandom(n) {
  Math.random = function() {
    return n;
  };
}

try {
  test('positive range', function(t) {
    t.plan(14);

    // binary
    mockRandom(0);
    t.equal(random(0, 1), 0);
    mockRandom(0.49999);
    t.equal(random(0, 1), 0);
    mockRandom(0.5);
    t.equal(random(0, 1), 1);
    mockRandom(0.51);
    t.equal(random(0, 1), 1);

    // bigger range
    mockRandom(0);
    t.equal(random(0, 19), 0);
    mockRandom(0.0499999);
    t.equal(random(0, 19), 0);
    mockRandom(0.05);
    t.equal(random(0, 19), 1);
    mockRandom(0.25);
    t.equal(random(0, 19), 5);
    mockRandom(0.40);
    t.equal(random(0, 19), 8);
    mockRandom(0.499999);
    t.equal(random(0, 19), 9);
    mockRandom(0.5);
    t.equal(random(0, 19), 10);
    mockRandom(0.94);
    t.equal(random(0, 19), 18);
    mockRandom(0.95);
    t.equal(random(0, 19), 19);
    mockRandom(0.999999);
    t.equal(random(0, 19), 19);
    t.end();
  });

  test('ranges wider than signed 32-bit integers', function(t) {
    t.plan(12);

    mockRandom(0);
    t.equal(random(0, 4294967295), 0);
    mockRandom(0.5);
    t.equal(random(0, 4294967295), 2147483648);
    mockRandom(0.75);
    t.equal(random(0, 4294967295), 3221225472);
    t.equal(random(4294967295), 3221225472);
    t.equal(random(4294967295, 0), 3221225472);
    mockRandom(1 - Math.pow(2, -53));
    t.equal(random(0, 4294967295), 4294967295);

    mockRandom(0.75);
    t.equal(random(-2147483648, 2147483647), 1073741824);
    t.equal(random(-4294967296, -1), -1073741824);
    t.equal(random(0, 10000000000), 7500000000);
    t.equal(random(-10000000000, 0), -2500000000);
    t.equal(random(-2147483648.5, 2147483647.5), 1073741824);
    mockRandom(0.5);
    t.equal(random(0, 8589934591), 4294967296);
    t.end();
  });

  test('negative to positive range', function(t) {
    t.plan(4);
    mockRandom(0);
    t.equal(random(-6, 7), -6);
    mockRandom(0.4999999);
    t.equal(random(-6, 7), 0);
    mockRandom(0.5);
    t.equal(random(-6, 7), 1);
    mockRandom(0.99999);
    t.equal(random(-6, 7), 7);
    t.end();
  });

  test('negative binary range', function(t) {
    t.plan(4);
    mockRandom(0);
    t.equal(random(-1, 0), -1);
    mockRandom(0.4999999);
    t.equal(random(-1, 0), -1);
    mockRandom(0.5);
    t.equal(random(-1, 0), 0);
    mockRandom(0.99999);
    t.equal(random(-1, 0), 0);
    t.end();
  });

  test('negative to negative range', function(t) {
    t.plan(5);
    mockRandom(0);
    t.equal(random(-11, -3), -11);
    mockRandom(0.44);
    t.equal(random(-11, -3), -8);
    mockRandom(0.45);
    t.equal(random(-11, -3), -7);
    mockRandom(0.5);
    t.equal(random(-11, -3), -7);
    mockRandom(0.99999);
    t.equal(random(-11, -3), -3);
    t.end();
  });

  test('non integer range', function(t) {
    t.plan(5);
    mockRandom(0);
    t.equal(random(0.7, 19.3), 0);
    mockRandom(0);
    t.equal(random(-1.5, 1.5), -1);
    mockRandom(0.48);
    t.equal(random(-1.5, 1.5), 0);
    mockRandom(0.999999);
    t.equal(random(-1.5, 1.5), 1);
    mockRandom(0.999999);
    t.equal(random(-2.8, 17.7), 17);
    t.end();
  });

  test('no range', function(t) {
    t.plan(9);
    mockRandom(0);
    t.equal(random(0), 0);
    mockRandom(0.99999);
    t.equal(random(0), 0);
    mockRandom(0);
    t.equal(random(3, 3), 3);
    mockRandom(0.5);
    t.equal(random(3, 3), 3);
    mockRandom(0.78);
    t.equal(random(-7, -7), -7);
    mockRandom(0.5);
    t.equal(random(0, 0), 0);
    mockRandom(0.9999);
    t.equal(random(100, 100), 100);
    mockRandom(0.34);
    t.equal(random(-18, -18), -18);
    mockRandom(0.11);
    t.equal(random(4.2, 4.2), 4);
    t.end();
  });

  test('switches args when higher number is first argument', function(t) {
    t.plan(4);
    mockRandom(0);
    t.equal(random(15, 4), 4);
    mockRandom(0.44);
    t.equal(random(-3, -11), -8);
    mockRandom(0.499999);
    t.equal(random(19, 0), 9);
    mockRandom(0);
    t.equal(random(7, -6), -6);
    t.end();
  });
} catch(e) {} finally {
  Math.random = nativeRandomFn;
}

test('invalid', function(t) {
  t.plan(6);

  t.throws(function() {
    random('just');
  });

  t.throws(function() {
    random(5, 'just');
  });

  t.throws(function() {
    random(5, {val: 1, foo: 2});
  });

  t.throws(function() {
    random(5, ['a', 'b']);
  });

  t.throws(function() {
    random(5, null);
  });

  t.throws(function() {
    random(5, function() {});
  });

  t.end();
});
