var test = require('../util/test')(__filename);
var demethodize = require('../../packages/function-demethodize');

/*
var trimFn = demethodize(''.trim);
['hello ', ' goodbye', 'hello again'].map(trimFn); // ['hello', 'goodbye', 'hello again']

var circle = {
  volumeOfCylinder: function (height) {
    return this.radius * this.radius * Math.PI * height;
  }
};
var volume = demethodize(circle.volumeOfCylinder)({radius: 3}, 4);

demethodize({}); // undefined
demethodize(undefined); // undefined
*/

test('resulting function uses first arg as `this` value', function(t) {
  t.plan(1);
  var trimFn = demethodize(''.trim);
  var mapped = ['hello ', ' goodbye', 'hello again'].map(trimFn);
  t.deepEqual(mapped, ['hello', 'goodbye', 'hello again']);
  t.end();
});

test('resulting function passes remaining args to new function', function(t) {
  t.plan(1);
  var circle = {
    volumeOfCylinder: function(height) {
      return this.radius * this.radius * Math.PI * height;
    },
  };
  var volume = demethodize(circle.volumeOfCylinder)({radius: 3}, 4);
  t.equal(volume.toFixed(1), '113.1');
  t.end();
});

test('throws when arg is not a function', function(t) {
  t.plan(2);
  t.throws(function() {
    demethodize({});
  });
  t.throws(function() {
    demethodize(null);
  });
  t.end();
});

test('resulting function throws when no args', function(t) {
  t.plan(1);
  var trimFn = demethodize(''.trim);
  t.throws(function() {
    trimFn();
  });
  t.end();
});
