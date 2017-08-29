# tap-out

A different tap parser

## Install

```
npm install tap-out --save
```

## Usage

**CLI**

```
$ something-that-produces-tap | tap-out
{
  tests: [
    { name: 'is true', number: 1, raw: '# is true', type: 'test' }
  ],
  asserts: [
    { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' }, 
    { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
  ],
  results: [],
  versions: [],
  comments: [],
  fail: [],
  pass: [ 
    { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
    { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
  ],
}
```

**API**

```js
var tapOut = require('tap-out');

var t = tapOut(function (output) {
  
  console.log(output);
});

t.on('assert', function (assert) {

	// Do something
});

process.stdin.pipe(t);
```

## Methods

### var t = tapOut(function (err, output) {})

Returns a stream that emits events with various TAP data. Takes a callback which is called when all parsing is done.

## Events

### t.on('output', function (output) {})

All output after all TAP data is parsed.

Example output

```js
{
  tests: [
    { name: 'is true', number: 1, raw: '# is true', type: 'test' }
  ],
  asserts: [
    { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' }, 
    { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
  ],
  results: [],
  versions: [],
  comments: [],
  fail: [],
  pass: [ 
    { name: 'true value', number: 1, ok: true, raw: 'ok 1 true value', test: 1, type: 'assert' },
    { name: 'true value', number: 2, ok: true, raw: 'ok 2 true value', test: 1, type: 'assert' }
  ],
}
```

### t.on('test', function (test) {})

Parsed test object with details.

* `type` - value will always be `test`
* `name` - name of the test
* `raw` - the raw output before it was parsed
* `number` - the number of the test

```js
{
  type: 'test',
  name: 'is true',
  raw: '# is true',
  number: 1
}
```

### t.on('assert', function (assertion) {})

Parsed assert object details.

* `type` - this will always be `assert`
* `name` - the name of the assertion
* `raw` - the raw output before it was parsed
* `number` - the number of the assertion
* `ok` - whether the assertion passed or failed
* `test` - the number of the test this assertion belongs to

```js
{
  name: 'true value',
  number: 1,
  ok: true,
  raw: 'ok 1 true value',
  test: 1,
  type: 'assert'
}
```

### t.on('version', function (version) {})

Parsed version data.

* `type` - this will always be `version`
* `raw` - the raw output before it was parsed

```js
{
  raw: 'TAP version 13',
  type: 'version'
}
```

### t.on('result', function (result) {})

Parsed test result data for tests, pass, fail.

* `type` - this will always be `result`
* `name` - the name of the result
* `raw` - the raw output before it was parsed
* `count` - the number of tests related to this result

Tests

```js
{
  count: '15',
  name: 'tests',
  raw: '# tests 15',
  type: 'result' 
}
```

Pass

```js
{
  count: '13',
  name: 'pass',
  raw: '# pass  13',
  type: 'result'
}
```

Fail

```js
{
  count: '2',
  name: 'fail',
  raw: '# fail  2',
  type: 'result'
}
```

### t.on('pass', function (assertion) {})

Parsed assertion that has passed with details. The assertion formate is the same as the [`assert`](#tonassert-function-assertion-) event.

### t.on('fail', function (assertion) {})

Failed assertion that has passed with details. The assertion formate is the same as the [`assert`](#tonassert-function-assertion-) event.

### t.on('comment', function (comment) {})

Generic output like `console.log()` in your tests.

* `type` - this will always be `comment`
* `raw` - the raw output before it was parsed
* `test` - the nubmer of the test this comment belongs to

```js
{
  type: 'comment',
  raw: 'this is a console log',
  test: 1
}
```

## Run Tests

```
git clone git@github.com:scottcorgan/tap-out.git && cd tap-out
npm install
npm test
```
