var test = require('../util/test')(__filename);
var bind = require('../../packages/function-bind');

test('update function scope', function(t) {
  t.plan(2);

  global.__TEST_JUST__ = true;

  var user = {
    name: 'Evandro',
  };

  function greet(greeting, city, country) {
    return `${greeting}, I'm ${this.name} and I live in ${city} - ${country}`;
  }

  var bound1 = bind(greet, user, 'Hi', 'Munich');
  t.equal(bound1('Germany'), "Hi, I'm Evandro and I live in Munich - Germany");

  var bound2 = bind(greet, user, 'Hello', 'Porto Alegre', 'Brazil');
  t.equal(bound2(), "Hello, I'm Evandro and I live in Porto Alegre - Brazil");

  t.end();

  global.__TEST_JUST__ = false;
});
