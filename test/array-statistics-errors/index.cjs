var test = require('../util/test')(__filename);
var stdev = require('../../packages/array-standard-deviation');
var skewness = require('../../packages/array-skewness');

test('minimum count errors say that two values are required', function(t) {
  var functions = [stdev, skewness];
  for (var i = 0; i < functions.length; i++) {
    var statistic = functions[i];
    t.throws(function() {
      statistic([]);
    }, /fewer than two values/);
    t.throws(function() {
      statistic([1]);
    }, /fewer than two values/);
    t.throws(function() {
      statistic();
    }, /fewer than two values/);
    t.throws(function() {
      statistic(1);
    }, /fewer than two values/);
  }
  t.end();
});
