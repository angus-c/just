# re-emitter [![travis](https://img.shields.io/travis/feross/re-emitter/master.svg)](https://travis-ci.org/feross/re-emitter) [![npm](https://img.shields.io/npm/v/re-emitter.svg)](https://npmjs.org/package/re-emitter) [![downloads](https://img.shields.io/npm/dm/re-emitter.svg)](https://npmjs.org/package/re-emitter)

#### Re emit events from another emitter

![reemit](https://raw.githubusercontent.com/feross/re-emitter/master/img.jpg)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/magnet-uri.svg)](https://saucelabs.com/u/magnet-uri)

Works in node and the browser with [browserify](http://browserify.org/).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### install

```
npm install re-emitter
```

### usage

```js
var reemit = require('re-emitter')

var emitter = new EventEmitter()
var other = new EventEmitter()

reemit(emitter, other, ['foo', 'bar'])

other.on('foo', function () {
  // foo will fire on other emitter!
})

emitter.emit('foo')

other.on('baz', function () {
  // baz will not fire on other emitter
})

emitter.emit('baz')
```

#### canceling re-emitting

`reemit` returns a `function`, which when called, cancels all re-emitting by removing the
event listeners which it added.

### contributors

- Raynos
- Feross

### license

MIT. Copyright (c) Raynos.
