# (Un)commonJS unit test runner

Implementation of [(Un)commonJS unit test runner][UncommonJS unit test runner].

[![build status](https://secure.travis-ci.org/Gozala/test-commonjs.png)](http://travis-ci.org/Gozala/test-commonjs)

## Testing

In order to make your package testable from [npm] you should:

- Create a directory in your package root.
- Define test directory in package descriptor under `directories` section.
- Define test script in package descriptor under `scripts` section.
- Define dependency on this package (It's name is "test" in [npm] registry).
- Write your tests
- Test your package by running all tests `npm test`
  or run individual tests `node ./path/to/test/group.js`

## Example

### package.json

```js
{
  "name": "mypackage",
  "version": "0.7.0",
  "description": "Sample package",
  "scripts": { "test": "node test/all.js" },
  "devDependencies": { "test": ">=0.0.5" }
}
```

### Async test

```js
// if test function expects second named argument it will be executed
// in async mode and test will be complete only after callback is called
exports['test my async foo'] = function(assert, done) {
  var http = require('http')
  var google = http.createClient(80, 'www.jeditoolkit.com')
  var request = google.request('GET', '/', {'host': 'www.jeditoolkit.com'})
  request.end()
  request.on('response', function (response) {
    assert.equal(response.statusCode, 302, 'must redirect') // will log result
    response.setEncoding('utf8')
    response.on('data', function (chunk) {
      assert.notEqual(chunk, 'helo world', 'must be something more inteligent')
      done() // telling test runner that we're done with this test
    })
  })
}

if (module == require.main) require('test').run(exports)
```

### Sync test

```js
// using assert passed to the test function that just logs failures
exports['test that logs all failures'] = function(assert) {
  assert.equal(2 + 2, 5, 'assert failure is logged')
  assert.equal(3 + 2, 5, 'assert pass is logged')
}

if (module == require.main) require('test').run(exports)
```

### Fast fail

```js
// using nodejs's build in asserts that throw on failure
var assert = require('assert')

exports['test that stops execution on first failure'] = function() {
  assert.equal(2 + 2, 5, 'assert fails and test execution stop here')
  assert.equal(3 + 2, 5, 'will never pass this since test failed above')
}

if (module == require.main) require('test').run(exports)
```

### Custom assertions

```js
var AssertBase = require('assert').Assert
var AssertDescriptor = {
  constructor: { value: Assert },
  inRange: { value: function (lower, inner, upper, message) {
    if (lower < inner && inner < upper) {
      this.fail({
        actual: inner,
        expected: lower + '> ' + ' < ' + upper,
        operator: "inRange",
        message: message
      })
    } else {
      this.pass(message);
    }
  }, enumerable: true }
}
function Assert() {
  return Object.create(AssertBase.apply(null, arguments), AssertDescriptor)
}

// bundling custom asserts with test suite
exports.Assert = Assert
exports['test with custom asserts'] = function(assert) {
  assert.inRange(2, 3, 5, 'passes assert and logs')
  assert.equal(3 + 2, 5, 'assert pass is logged')
}

if (module == require.main) require('test').run(exports)
```

For more examples checkout tests for this package and for more details see
the [UncommonJS unit test runner] specification.

[UncommonJS unit test runner]:https://github.com/kriskowal/uncommonjs/blob/master/tests/specification.md
[npm]:http://npmjs.org/
