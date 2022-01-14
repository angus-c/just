var test = require('../util/test')(__filename);
var percentile = require('../../packages/array-percentile');

test('array of numbers where percentile falls exactly on an index', function(t) {
  t.plan(6);
  var dataset = [5, 4, 1, 3, 2];
  t.equal(percentile(dataset, 0), 1);
  t.equal(percentile(dataset, 0.25), 2);
  t.equal(percentile(dataset, 0.5), 3);
  t.equal(percentile(dataset, 0.75), 4);
  t.equal(percentile([1, 1, 1, 1, 1], 0.17), 1);
  t.equal(percentile([-4.2, -4.2, -4.2, -4.2, -4.2], 0.67), -4.2);
  t.end();
});

test('array of numbers where percentile falls outside outer bounds', function(t) {
  t.plan(3);
  t.equal(percentile([0.1, 2, 93, 14.98, 7], 0.4), 5);
  t.equal(percentile([0.1, 2, 93, 14.98, 7], 0.94).toFixed(3), '74.275');
  t.equal(percentile([44, -2.91, 7, 7, -2.91], 0.3).toFixed(3), '-0.928');
  t.end();
});

test('array of numbers where percentile falls between indices', function(t) {
  t.plan(5);
  t.equal(percentile([1, 2, 3, 4, 5], 0.15).toFixed(2), '1.60');
  t.equal(percentile([5, 4, 1, 3, 2], 0.35).toFixed(2), '2.40');
  t.equal(percentile([1, 2, 3, 4, 5], 0.44).toFixed(2), '2.76');
  t.equal(percentile([100, 101, 92, 4, 102, 66, 66], 0.65).toFixed(2), '99.20');
  t.equal(percentile([100, 101, 92, 4, 102, 32], 0.50).toFixed(2), '96.00');
  t.end();
});

test('array of known data set from spec', function(t) {
  t.plan(1);
  //from https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm
  var values = [
    95.1772, 95.1567, 95.1937, 95.1959, 95.1442, 95.0610,
    95.1591, 95.1195, 95.1065, 95.0925, 95.1990, 95.1682,
  ];
  var expectedPercentile = '95.1957';
  t.equal(percentile(values, 0.90).toFixed(4), expectedPercentile);
  t.end();
});

test('list of numeric arguments throws', function(t) {
  t.plan(2);
  t.throws(function() {
    percentile(1, 2, 3, 4, 5, 0.50);
  });
  t.throws(function() {
    percentile(1, 0.10);
  });
  t.end();
});

test('non numeric values throw', function(t) {
  t.plan(5);
  t.throws(function() {
    percentile([1, '2', 3, 4, 5], 0.50);
  });
  t.throws(function() {
    percentile([], 0.20);
  });
  t.throws(function() {
    percentile([false, true], 0.66);
  });
  t.throws(function() {
    percentile([{}], 0.66);
  });
  t.throws(function() {
    percentile(null, 0.40);
  });
  t.end();
});
