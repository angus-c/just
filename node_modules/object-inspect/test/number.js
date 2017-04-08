var inspect = require('../');
var test = require('tape');

test('negative zero', function (t) {
    t.equal(inspect(0), '0');
    t.equal(inspect(-0), '-0');
    t.end();
});
