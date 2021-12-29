var test = require('../util/test')(__filename);
var random = require('../../packages/number-random-integer');

test.only('returns correct value for a given Math.random() result', function(t) {
  t.plan(41);
  var nativeRandomFn = Math.random();
  function mockRandom(n) {
    Math.random = function() {
      return n;
    };
  }

  try {
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

    // non integer range
    mockRandom(0);
    t.equal(random(-0.7, 19.3), 0);
    mockRandom(0.999999);
    t.equal(random(-0.7, 19.3), 19);

    // negative to positive range
    mockRandom(0);
    t.equal(random(-6, 7), -6);
    mockRandom(0.4999999);
    t.equal(random(-6, 7), 0);
    mockRandom(0.5);
    t.equal(random(-6, 7), 1);
    mockRandom(0.99999);
    t.equal(random(-6, 7), 7);

    // negative binary
    mockRandom(0);
    t.equal(random(-1, 0), -1);
    mockRandom(0.4999999);
    t.equal(random(-1, 0), -1);
    mockRandom(0.5);
    t.equal(random(-1, 0), 0);
    mockRandom(0.99999);
    t.equal(random(-1, 0), 0);

    // negative to negative range
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

    // no range
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

    // switches args when higher number first
    mockRandom(0);
    t.equal(random(15, 4), 4);
    mockRandom(0.44);
    t.equal(random(-3, -11), -8);
    mockRandom(0.499999);
    t.equal(random(19, 0), 9);
    mockRandom(0);
    t.equal(random(7, -6), -6);
  } catch(e) {} finally {
    Math.random = nativeRandomFn;
  }

  t.end();
});

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
