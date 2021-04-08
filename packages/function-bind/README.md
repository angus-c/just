## just-bind

Part of a [library](../../../../) of zero-dependency npm modules that do just do one thing.
Guilt-free utilities for every occasion.

```
import bind from 'just-bind;

function greet(greeting, city, country) {
  return `${greeting}, I'm ${this.name} and I live in ${city} - ${country}`;
}

var bound1 = bind(greet, user, 'Hi', 'Munich');
bound1('Germany'); // "Hi, I'm Evandro and I live in Munich - Germany"

var bound2 = bind(greet, user, 'Hello', 'Porto Alegre', 'Brazil');
bound2(); // "Hello, I'm Evandro and I live in Porto Alegre - Brazil"
```
